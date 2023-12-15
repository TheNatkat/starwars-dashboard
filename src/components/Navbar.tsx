import React from 'react';
import styled from 'styled-components';
import starWarsLogo from '../assets/logo.svg';
import seachIcon from '../assets/seachicon.svg';

const BarWrapper = styled.section`
  height: 10vh;
  width: 100vw;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Searchbar = styled.input`
  height: 3.5vh;
  width: 20vw;
  background-color: #03123d;
  padding: 0.3rem;
  color: white;
  border: 1px solid white;
  text-decoration: none;
  border-radius: 4px;
  padding-left: 2rem; 
  ::placeholder {
    color: white;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
`;

const Navbar = () => {
  return (
    <BarWrapper>
      <img src={starWarsLogo} alt="Star Wars Logo" />
      <InputContainer>
        <SearchIcon src={seachIcon}/>
        <Searchbar placeholder="Search" />
      </InputContainer>
    </BarWrapper>
  );
};

export default Navbar;
