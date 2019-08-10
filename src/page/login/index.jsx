import React from 'react';
import 'antd/dist/antd.css';
import {Form, Icon, Input, message,Modal} from "antd";
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
        Modal.info({
            title: '使用前请阅读以下内容',
            content: (
                <div>
                    <p>本系统主要解决四川航天职业技术学院的教务系统端口是95的问题</p>
                    <p>本系统暂时存在一个致命Bug导致只能一人登录，多人登录会导致之前登录的用户掉线</p>
                    <p>如果你用解决方案请联系作者本人:<a href="tencent://message/?uin=917885215&Site=&Menu=yes">联系我</a></p>
                </div>
            ),
            onOk() {},
        });
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleSubmit(e) {
        e.preventDefault();
        message.loading("正在登录！");
        fetch("https://backstage.edu.css0209.cn/user/login", {
            method: "post",
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password,
                'captcha': this.state.captcha
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
                        <br />作者Blog: <a href="https://css0209.cn" target={"_blank"}>BlankYk's Blog</a>
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