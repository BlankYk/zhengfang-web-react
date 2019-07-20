import styled from 'styled-components';

export const GradeWrapper = styled("div")`
    width: 100%;
    height: 100%;
    .gradeBox:after{
      content: "";
      display: block;
      clear: both;
    }
    .selects{
      margin: 20px;
      float: left;
    }
    .search{
      margin: 5px 0;
    }
    .select{
      width: 150px;
    }
    
`;