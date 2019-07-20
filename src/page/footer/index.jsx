import React from 'react';
import {FooterWrapper} from "./style";

class Footer extends React.Component{
    render() {
        return(
            <FooterWrapper>
                <p><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=a-82dfrgf9sYvI8fPEee_0DtXMbLO-ZnJRxtBediy5LiwSFPUp0h!-1959473862" target={'_blank'}>蜀ICP备17038940号-2</a></p>
                <p>©CopyRight 2019 <a href="https://css0209.cn" target={'_blank'}>BlankYk</a></p>
            </FooterWrapper>
        )
    }
}

export default Footer;