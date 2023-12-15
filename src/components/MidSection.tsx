import React from 'react';

import styled from 'styled-components';
import Home from './pages/home';

const MidWapper = styled.section`
  height: 90vh;
  width: 82.5vw;
  padding: 2rem;
`;

const MidSection = () => {
  return <MidWapper>
    <Home/>
  </MidWapper>;
};

export default MidSection;
