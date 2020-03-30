import React from 'react';
import 'antd/dist/antd.css';
import {Form, Icon, Input, message,Modal} from "antd";
import {
    LoginWrapper
} from "./style";
import store from '../../store';
import {
    getUsernameOnchange, getCaptchaSrcChange, getPasswordChange, getCaptchaChange, loginChange,getToken
} from '../../store/actionCreators';
import Footer from "../footer";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleGetToken();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }
    componentDidMount() {
        Modal.info({
            title: '使用前请阅读以下内容',
            content: (
                <div>
                    <p>本系统主要解决四川航天职业技术学院的教务系统端口是95的问题,不会存在账号安全问题，如对安全又担心可以查看 <a href="https://github.com/BlankYk/zhengfang-SpringBoot#%E5%8E%9F%E7%90%86" rel="noopener noreferrer" target='_blank'>原理</a> </p>
                    <p>作者:<a href="tencent://message/?uin=917885215&Site=&Menu=yes" rel="noopener noreferrer" target='_blank'>联系我</a></p>
                </div>
            ),
            onOk() {},
        });
    }
    handleGetToken(){
        let newTime = new Date();
        fetch(this.state.backendHost+"/token?path=" + newTime.getHours() + newTime.getMinutes() + newTime.getSeconds() + newTime.getMilliseconds())
            .then(rep => {
                return rep.json();
            }).then(json => {
            const action = getToken(json.item.token);
            store.dispatch(action);
            this.handleCaptchaSrcChange();
        });
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleSubmit(e) {
        e.preventDefault();
        message.loading("正在登录！");
        fetch(this.state.backendHost+"/login", {
            method: "post",
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password,
                'captcha': this.state.captcha,
                "token": this.state.token
            }),
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            })

        }).then(rep => {
            return rep.json();
        }).then(data => {
            if (data.result === "success") {
                message.info(data.msg);
                sessionStorage.setItem('token',this.state.token)
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
                    <small>
                        本项目地址:前端: <a href="https://github.com/BlankYk/zhengfang-web-react" target={"_blank"}>zhengfang-web-react</a>
                        <br />后端: <a href="https://github.com/BlankYk/zhengfang-SpringBoot"  target={"_blank"}>zhengfang-SpringBoot</a>
                        <br />作者Blog: <a href="https://css0209.cn" target={"_blank"}>PaleBlueYk's Blog</a>
                    </small>
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