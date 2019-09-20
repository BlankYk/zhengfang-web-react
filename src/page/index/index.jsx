import React from 'react';
import {Button, Card, message} from "antd";
import {
    IndexWrapper
} from "./style";
import store from '../../store/';
import {loginChange, loginOut, setInfo} from "../../store/actionCreators";
import Grade from "../grade";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoLoading: true
        };
        this.storeState = store.getState();
        this.handleGetState();
        this.handleLoginOut = this.handleLoginOut.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleGetState() {
        if(this.storeState === ""){
            this.props.history.push('login');
            return;
        }
        fetch(this.storeState.backendHost+"/info?token="+this.storeState.token+"&?" + new Date().getMilliseconds(), {
            credentials: "include"
        }).then(rep => {
            return rep.json()
        }).then(json => {
            if (json.result === "success") {
                const action = loginChange(true);
                const action1 = setInfo(json.item);
                store.dispatch(action);
                store.dispatch(action1);
                this.setState({
                    infoLoading: false
                })
            } else {
                const action = loginChange("");
                store.dispatch(action);
                this.props.history.push('login');
            }
        })
    }

    handleLoginOut() {
        fetch(this.storeState.backendHost+"/loginOut?"+new Date().getMilliseconds(), {
            method: "delete",
            credentials: "include"
        }).then(rep => {
            return rep.json();
        }).then(json => {
            const action = loginOut();
            store.dispatch(action);
            message.info(json.msg);
            this.props.history.push('login');
        })
    }

    render() {
        const storeState = store.getState();
        return (
            <React.Fragment>
            <IndexWrapper>
                <h1>川航成绩查询平台</h1>
                <div className={"userInfoBox"}>
                    <Card title={"个人信息"} loading={this.state.infoLoading}>
                        <div className="infoBox">
                            <p>姓名：{storeState.info.name} </p><p>学号：{storeState.info.student_id}</p>
                            <p>院系：{storeState.info.faculty} </p><p>专业：{storeState.info.profession}</p>
                            <p>班级：{storeState.info.asClass}</p>
                        </div>
                        <Button className="btn" onClick={this.handleLoginOut.bind()}>注销</Button>
                    </Card>
                </div>
                <Grade/>
            </IndexWrapper>
            </React.Fragment>
        );

    }
}

export default Index;