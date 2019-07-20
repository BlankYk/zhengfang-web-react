import React from 'react';
import 'antd/dist/antd.css';
import {Form, Icon, Input, message} from "antd";
import {
    LoginWrapper
} from "./style";
import store from '../../store';
import {
    getUsernameOnchange, getCaptchaSrcChange, getPasswordChange, getCaptchaChange, loginChange
} from '../../store/actionCreators';
import Footer from "../footer";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }
    componentDidMount() {
        this.handleCaptchaSrcChange();
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        formData.append("captcha", this.state.captcha);
        message.loading("正在登录！");
        fetch("https://backstage.edu.css0209.cn/user/login", {
            method: "post",
            body: formData,
            credentials: 'include'
        }).then(rep => {
            return rep.json();
        }).then(data => {
            if (data.result === "success") {
                message.info(data.msg);
                const action = loginChange(true);
                store.dispatch(action);
                this.props.history.push('');
            } else {
                message.error(data.msg);
            }
        });
    }

    handleCaptchaSrcChange() {
        const action = getCaptchaSrcChange();
        store.dispatch(action);
    }

    handleUsernameChange(e) {
        const action = getUsernameOnchange(e.target.value);
        store.dispatch(action);
    }

    handlePasswordChange(e) {
        const action = getPasswordChange(e.target.value);
        store.dispatch(action);
    }

    handleCaptchaChange(e) {
        const action = getCaptchaChange(e.target.value);
        store.dispatch(action);
    }

    render() {
        return (
            <React.Fragment>
            <LoginWrapper>
                <Form onSubmit={this.handleSubmit.bind(this)} method={"post"}>
                    <h1>川航成绩查询</h1>
                    <h1>登录</h1>
                    <Input size={"large"}
                           placeholder="学号" prefix={<Icon type="user"/>}
                           onChange={this.handleUsernameChange.bind(this)}
                           value={this.state.username}
                           required={true}/>
                    <Input.Password size={"large"} prefix={<Icon type={"lock"}/>}
                                    onChange={this.handlePasswordChange.bind(this)} placeholder="密码"
                                    value={this.state.password}
                                    required={true}/>
                    <div>
                        <img src={this.state.captchaSrc} alt={"验证码"}
                             title={"点击刷新验证码"}
                             onClick={this.handleCaptchaSrcChange.bind(this)}/>
                        <Input size={"large"} className={"captcha"} onChange={this.handleCaptchaChange.bind(this)}
                               placeholder={"验证码"}
                               value={this.state.captcha}
                               required={true}/>
                    </div>
                    <button type="submit" className={"login"}>登录</button>
                </Form>
            </LoginWrapper>
                <Footer/>
            </React.Fragment>
        );
    }

}

export default Login;