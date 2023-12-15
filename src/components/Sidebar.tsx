import React from 'react';
import styled from 'styled-components';
import folderIcon from '../assets/folder.svg';
import rightArrowIcon from '../assets/rightarrowicon.svg';

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
`;

const TextArea = styled.div`
  display: flex;
  align-items: center;
  color: white;
  column-gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const Sidebar = () => {

 const allOptions = ["Films","People","Planets","Species","Starships","Vehicles"];


  return (
    <SideBarWrapper>
      <OptionsSection>
        {allOptions.map((item, idx) => {
          return (
            <Options key={idx}>
              <TextArea>
                <img src={folderIcon} />
                {item}
              </TextArea>
              <img src={rightArrowIcon}/>
            </Options>
          );
        })}
      </OptionsSection>
    </SideBarWrapper>
  );
};

export default Sidebar;
