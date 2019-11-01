import {
    USERNAME_CHANGE, CAPTCHASRC_CHANGE, PASSWORD_CHANGE, CAPTCHA_CHANGE,
    LOGINCHANGE, LOGINSTATE, SET_INFO, FAILED_GRADE, LOGIN_OUT, SEARCH_GRADE,
    GET_TOKEN
} from "./ActionTypes";

const defaultState = {
    backendHost: "https://backstage.edu.css0209.cn/user",
    username: "",
    captcha: "",
    captchaSrc: "",
    token: sessionStorage.getItem('token'),
    isLogin: false,
    info: {},
    gradeState: {
        year: '',
        semester: '',
        courseNature: '',
        btn: 'Button1'
    }
};



export default (state = defaultState, action) => {
    if (action.type === USERNAME_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.username = action.value;
        return newState;
    }
    if (action.type === CAPTCHASRC_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.captchaSrc = "https://backstage.edu.css0209.cn/user/captcha?token=" + newState.token + "&path=" + Math.random(0,1)*100000000000000000;
        return newState;
    }
    if (action.type === PASSWORD_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.password = action.value;
        return newState;
    }
    if (action.type === CAPTCHA_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.captcha = action.value;
        return newState;
    }
    if (action.type === LOGINSTATE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isLogin = action.flag;
        return newState;
    }
    if (action.type === LOGINCHANGE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isLogin = action.value;
        return newState;
    }
    if (action.type === SET_INFO) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.info = action.json;
        return newState;
    }
    if (action.type === FAILED_GRADE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.failedGrade = action.json;
        return newState;
    }
    if (action.type === LOGIN_OUT) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.isLogin = false;
        newState.info = {};
        newState.failedGrade = null;
        newState.token = "";
        return newState;
    }
    if (action.type === SEARCH_GRADE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.gradeState = action.json;
        return newState;
    }
    if(action.type === GET_TOKEN){
        const newState = JSON.parse(JSON.stringify(state));
        newState.token = action.value;
        return newState;
    }
    return state;
}