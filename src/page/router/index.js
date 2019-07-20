import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Login from '../login/';
import Index from '../index';
import NotFound from '../notfound/';
import store from '../../store/';
// import {loginChange} from "../../store/actionCreators";

class MyRouter extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
    }


    render() {
        const setTitle = (title) => {
            document.title = title
        };
        return(
            <Router>
                <Switch>
                <Route path="/login" exact component={Login} onEnter={setTitle("登录")} />
                <Route path={"/"} exact component={Index} onEnter={setTitle("成绩查询")}/>
                <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default MyRouter;