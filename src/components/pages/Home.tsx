import React from 'react';
import styled from 'styled-components';
import homeImage from '../../assets/homeimage.svg';

const PageWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const MidBox = styled.div`
  display: flex;
  padding: 1rem;
  
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  row-gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: left;
`;

const Text = styled.h4`
  font-size: 1.2rem;
  font-weight: 100;
  text-align: left;
  width: 55vw;
`;

const Home = () => {
  return (
    <PageWapper>
      <MidBox>
        <img src={homeImage} />
        <Title>Welcome to Star Wars Dashboard</Title>
        <Text>
          {`Star Wars is an American epic space opera multimedia franchise created by George Lucas, which
           began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon.`}
        </Text>
      </MidBox>
    </PageWapper>
  );
};

export default Home;
