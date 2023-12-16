import React from 'react';
import styled from 'styled-components';
import Home from './pages/Home';
import usePageStore from '../store/pagestore';
import Films from './pages/Films';
import People from './pages/People';
import Planets from './pages/Planets';
import Species from './pages/Species';
import Starships from './pages/Starships';
import Vehicles from './pages/Vehicles';
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
  display: flex;
  height: 4vh;
  border-radius: 8px;
`;

const ToggleButtonPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid white;
  
  background-color: ${(props) => (props.isactive == "true" ? 'white' : '#03123d')};
  cursor: pointer;
`;

const ToggleButtonText = styled.h6`
  font-weight: 300;
  font-size: 1rem;
  padding-right: 0.5rem;
`;

const Icon = styled.img`
  padding: 0.5rem;
  
`;

interface AllPages {
  [key: string]: React.ComponentType<any>;
}

const allPages: AllPages = {
  Films: Films,
  People: People,
  Planets: Planets,
  Species: Species,
  Starships: Starships,
  Vehicles: Vehicles,
  Home: Home,
};

const MidSection = () => {
  const page = usePageStore((state) => state.page);
  const isGrid = usePageStore((state) => state.isGrid);
  const setIsGrid = usePageStore((state) => state.setIsGrid);

  const PageToRender = allPages[page] || Home;

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
              <ToggleButtonPart isactive={isGrid ? 'true' : 'false'}>
                <Icon src={isGrid ? GridOnIcon : GridOffIcon} />
                {isGrid && <ToggleButtonText>Grid</ToggleButtonText>}
              </ToggleButtonPart>
              <ToggleButtonPart isactive={!isGrid ? 'true' : 'false'}>
                <Icon src={isGrid ? ListOffIcon : ListOnIcon} />
                {!isGrid && <ToggleButtonText>List</ToggleButtonText>}
              </ToggleButtonPart>
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
