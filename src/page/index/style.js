import styled from 'styled-components';

export const IndexWrapper = styled.div`
    width: 90%;
    height: 100%;
    margin: 40px auto;
    h2{
      text-align: left;
    }
    h1{
        text-align: center;
    }
    .infoBox>p{
        width: 50%;
        display: block;
        float: left;
        text-align: left;
    }
    .infoBox::after{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        clear: both;
    }
    @media (max-width: 746px){
    width: 100%;
        h2{
          text-align: center;
        }
        .infoBox>p{
          width: 100%;
        }
    }
`;