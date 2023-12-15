import React from 'react';
import styled from 'styled-components';
import folderIcon from '../assets/folder.svg';
import rightArrowIcon from '../assets/rightarrowicon.svg';
import usePageStore from '../store/pagestore';

const SideBarWrapper = styled.section`
  height: 90vh;
  width: 17.5vw;
  padding: 1.5rem;
`;

const OptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const Options = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TextArea = styled.div`
  display: flex;
  align-items: center;
  color: white;
  column-gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const Sidebar: React.FC = () => {
  const allOptions = ['Films', 'People', 'Planets', 'Species', 'Starships', 'Vehicles'];
  const setPage = usePageStore((state) => state.setPage);
  const currentPage = usePageStore((state) => state.page);
   const setIsGrid = usePageStore((state) => state.setIsGrid);

  const handleOptionClick = (newPage: string) => {
    if (newPage == currentPage) return;
    if (newPage == 'Films'){
        setPage(newPage);
        setIsGrid(true);
    }else{
         setPage(newPage);
         setIsGrid(false);
    }
  };

  return (
    <SideBarWrapper>
      <OptionsSection>
        {allOptions.map((item, idx) => (
          <Options key={idx} onClick={() => handleOptionClick(item)}>
            <TextArea>
              <img src={folderIcon} alt="Folder Icon" />
              {item}
            </TextArea>
            <img src={rightArrowIcon} alt="Right Arrow Icon" />
          </Options>
        ))}
      </OptionsSection>
    </SideBarWrapper>
  );
};

export default Sidebar;
