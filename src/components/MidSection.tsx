import React, { useState } from 'react';
import styled from 'styled-components';
import Home from './pages/Home';
import usePageStore from '../store/pagestore';
import Films from './pages/Films';
// import People from './pages/People';
// import Planets from './pages/Planets';
// import Species from './pages/Species';
// import Starships from './pages/Starships';
// import Vehicles from './pages/Vehicles';
import GridOnIcon from '../assets/gridonicon.svg';
import GridOffIcon from '../assets/gridofficon.svg';
import ListOnIcon from '../assets/listonicon.svg';
import ListOffIcon from '../assets/listofficon.svg';


const Mid = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const MidWapper = styled.section`
  height: 80vh;
  width: 82.5vw;
  overflow: scroll;
`;

const HeadingSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.div`
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #03123d;
  border-radius: 8px;
  cursor: pointer;
`;


interface AllPages {
  [key: string]: React.ComponentType<any>;
}

const allPages: AllPages = {
  Films: Films,
//   People: People,
//   Planets: Planets,
//   Species: Species,
//   Starships: Starships,
//   Vehicles: Vehicles,
  Home: Home,
};

const MidSection = () => {
  const page = usePageStore((state) => state.page);
  const isGrid = usePageStore((state) => state.isGrid);
  const setIsGrid = usePageStore((state) => state.setIsGrid);
  console.log(isGrid);

  const PageToRender = allPages[page] || Home; // Default to Home if the page is not found

   const handleToggleChange = () => {
     setIsGrid(!isGrid);

   };

  return (
    <Mid>
      {page !== 'Home' && (
        <HeadingSection>
          <Text>{page}</Text>
          <ToggleContainer>
            <ToggleButton onClick={handleToggleChange}>
              <div
                style={{
                  backgroundColor: isGrid ? 'white' : '#03123d',
                  display: 'flex',
                  height: '4vh',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                  borderBottomRightRadius: '0px',
                  borderTopRightRadius: '0px',
                  border: '1px solid white',
                }}
              >
                <img src={isGrid ? GridOnIcon : GridOffIcon} style={{padding: '0.5rem', paddingRight: isGrid ? '0rem' : '0.5rem'}}/>
                {isGrid && <h6 style={{ paddingRight: '0.5rem', fontWeight: '300', fontSize: '0.8rem' }}>Grid</h6>}
              </div>
              <div
                style={{
                  backgroundColor: !isGrid ? 'white' : '#03123d',
                  display: 'flex',
                  height: '4vh',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  border: '1px solid white',
                }}
              >
                <img src={isGrid ? ListOffIcon : ListOnIcon} />
                {!isGrid && <h6 style={{ paddingRight: '0.5rem', fontWeight: '300', fontSize: '0.8rem' }}>List</h6>}
              </div>
            </ToggleButton>
          </ToggleContainer>
        </HeadingSection>
      )}
      <MidWapper>
        <PageToRender />
      </MidWapper>
    </Mid>
  );
};

export default MidSection;
