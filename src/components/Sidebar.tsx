import React from 'react';
import styled from 'styled-components';
import folderIcon from '../assets/folder.svg';
import rightArrowIcon from '../assets/rightarrowicon.svg';
import usePageStore from '../store/pagestore';

// Styled components for the Sidebar
const SideBarWrapper = styled.section`
  height: 90vh;
  width: 30vw;
  padding: 1.5rem;
`;

const OptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const Options = styled.div`
  padding: 0.6rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const TextArea = styled.div`
  display: flex;
  align-items: center;
  color: white;
  column-gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

// Sidebar component definition
const Sidebar: React.FC = () => {
  // Options available in the sidebar
  const allOptions = ['Films', 'People', 'Planets', 'Species', 'Starships', 'Vehicles'];

  // State management using the custom store
  const setPage = usePageStore((state) => state.setPage);
  const currentPage = usePageStore((state) => state.page);
  const setIsGrid = usePageStore((state) => state.setIsGrid);

  // Handle the click event for an option in the sidebar
  const handleOptionClick = (newPage: string) => {
    // If the selected option is the same as the current page, do nothing
    if (newPage === currentPage) return;

    // Set the page and update the grid view based on the selected option
    if (newPage === 'Films') {
      setPage(newPage);
      setIsGrid(true);
    } else {
      setPage(newPage);
      setIsGrid(false);
    }
  };

  // Rendering the Sidebar component
  return (
    <SideBarWrapper>
      <OptionsSection>
        {/* Map through each option and create a clickable element */}
        {allOptions.map((item, idx) => (
          <Options
            style={{ backgroundColor: item !== currentPage ? '#03123D' : '#cc1980' }}
            key={idx}
            onClick={() => handleOptionClick(item)}
          >
            {/* Display the folder icon and the option text */}
            <TextArea>
              <img src={folderIcon} alt="Folder Icon" />
              {item}
            </TextArea>

            {/* Display the right arrow icon with rotation based on the selected option */}
            <img
              src={rightArrowIcon}
              style={{ transform: item === currentPage ? 'rotate(90deg)' : '' }}
              alt="Right Arrow Icon"
            />
          </Options>
        ))}
      </OptionsSection>
    </SideBarWrapper>
  );
};

export default Sidebar;
