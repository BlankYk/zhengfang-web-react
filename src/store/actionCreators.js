import {
    USERNAME_CHANGE,
    CAPTCHASRC_CHANGE,
    PASSWORD_CHANGE,
    CAPTCHA_CHANGE,
    LOGINCHANGE,
    LOGINSTATE,
    SET_INFO,
    FAILED_GRADE,
    LOGIN_OUT, SEARCH_GRADE,
    GET_TOKEN
} from './ActionTypes';


export const getUsernameOnchange = (value) =>({
    type: USERNAME_CHANGE,
    value
});

export const getPasswordChange = (value) =>({
    type: PASSWORD_CHANGE,
    value
});

export const getCaptchaChange = (value) =>({
    type: CAPTCHA_CHANGE,
    value
});

export const getCaptchaSrcChange = () => ({
    type: CAPTCHASRC_CHANGE
});

export const loginChange = (value) => ({
    type: LOGINCHANGE,
    value
});

export const loginState = ()=>({
   type: LOGINSTATE
});

export const loginOut = ()=>({
    type: LOGIN_OUT
});

export const setInfo = (json) =>({
    type: SET_INFO,
    json
});

export const failedGrade = (json)=>({
    type: FAILED_GRADE,
    json
});

export const searchGrade = (json)=>({
    type: SEARCH_GRADE,
    json
});

export const getToken = (value)=>({
    type: GET_TOKEN,
    value
});
