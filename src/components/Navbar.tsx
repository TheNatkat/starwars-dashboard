import React from 'react';
import styled from 'styled-components';
import starWarsLogo from '../assets/logo.svg';
import seachIcon from '../assets/seachicon.svg';
import usePageStore from '../store/pagestore';

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
  width: 15vw;
  background-color: #03123d;
  padding: 0.3rem;
  color: white;
  border: 1px solid white;
  text-decoration: none;
  border-radius: 4px;
  padding-left: 2rem;
  ::placeholder {
    color: white !important;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
`;

const Navbar = () => {
  const setPage = usePageStore((state) => state.setPage);

  return (
    <BarWrapper>
      <img style={{ cursor: "pointer"}} src={starWarsLogo} alt="Star Wars Logo" onClick={() => setPage('Home')} />
      <InputContainer>
        <SearchIcon src={seachIcon} />
        <Searchbar placeholder="Search" />
      </InputContainer>
    </BarWrapper>
  );
};

export default Navbar;
