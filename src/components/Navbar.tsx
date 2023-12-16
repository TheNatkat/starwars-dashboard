import React from 'react';
import styled from 'styled-components';
import starWarsLogo from '../assets/logo.svg';
import seachIcon from '../assets/seachicon.svg';
import usePageStore from '../store/pagestore';

// Styled components for the Navbar
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

// Navbar component definition
const Navbar = () => {
  // State management using the custom store
  const setPage = usePageStore((state) => state.setPage);

  // Rendering the Navbar component
  return (
    <BarWrapper>
      {/* Star Wars logo with a clickable action to navigate to the 'Home' page */}
      <img style={{ cursor: 'pointer' }} src={starWarsLogo} alt="Star Wars Logo" onClick={() => setPage('Home')} />

      {/* Input container for the search bar */}
      <InputContainer>
        {/* Search icon positioned to the left of the search bar */}
        <SearchIcon src={seachIcon} />

        {/* Search bar input field */}
        <Searchbar placeholder="Search" />
      </InputContainer>
    </BarWrapper>
  );
};

export default Navbar;
