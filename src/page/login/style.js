import styled from 'styled-components';

export const LoginWrapper = styled("div")`
    width: 100%;
    height: 100%;
    padding: 50px 0;
    h1{
      text-align: center;
      color: #282c34;
    }
    form{
      width: 50%;
      padding: 0 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-70%);
    }
    i{
      color: rgba(0,0,0,.25);
    }
    input,i{
      margin-top: 20px;
    }
    .login{
      display: block;
      margin: 20px auto;
      padding: 0;
      background-color: transparent;
      border: 1px solid #282c34;
      width: 80px;
      height: 35px;
      color: #282c34;
      position: relative;
    }
    .login:before{
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      background-color: #282c34;
      position: absolute;
      top: 0;
      left: 0;
      transform: scaleY(0);
      transform-origin: 0 0;
      transition: .5s;
      transition-timing-function: cubic-bezier(0.5,1.6,0.6,0.7);
      z-index: -1;
    }
    .login:hover{
      cursor: pointer;
      color: #fff;
    }
    .login:hover:before{
      transform: scaleY(1);
    }
    img{
      height: 40px;
      float: left;
      margin-top: 20px;
    }
    .captcha{
      width: 60%;
      float: right;
    }
    div:after{
      content: "";
      display: block;
      clear: both;
    }
    img{
      cursor: pointer;
    }
    @media (max-width: 768px){
      form{
        width: 80%;
        padding: 0;
      }
    }
`;