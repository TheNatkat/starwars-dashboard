import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanetIcon from '../../assets/planeticon.svg'; // Assuming you have a planet icon
import LoadingAnimation from '../../assets/loading.svg';
import OptionIcon from '../../assets/optionsicon.svg';
import OptionListIcon from '../../assets/optiontransprenticon.svg';
import usePageStore from '../../store/pagestore';

const PlanetsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  row-gap: 2rem;
`;

const PlanetCard = styled.div`
  width: 23vw;
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -webkit-transition: all 1s ease;

  &:hover {
    filter: grayscale(0%);
    filter: gray;
    -webkit-filter: grayscale(0%);
    filter: none;
    transition: 1s ease;
    transform: scale(0.99);
  }
`;

const PlanetImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const Text = styled.h2`
  color: white;
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  align-self: center;
`;

const LoadingText = styled.div`
  color: white;
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  background-color: rgba(249, 250, 253, 0.2);
  border-radius: 10px;
  padding: 1rem;
`;

const PlanetTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const Option = styled.div`
  position: relative;
  border-radius: 5px;
  cursor: pointer;
  z-index: 2;
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  bottom: ${(props) => (props.view != 'true' ? '10' : '100%')};
  top: ${(props) => (props.view == 'true' ? '' : '100%')};
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5rem;
  z-index: 3;

  ${Option}:hover & {
    z-index: 100 !important;
    display: block;
  }
`;

const DropDownItem = styled.p`
  padding: 0.5rem;
  color: black;
  & ~ &:hover {
    background-color: #f1f1f5;
  }
`;

const TableList = styled.table`
  width: 100%;
  border-spacing: 0;
  margin-top: 2rem;
  color: white;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const TableColumn = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid white;
`;

const PlanetTitleList = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  color: white;
  font-size: 1rem;
`;

const OptionsList = styled(Option)`
  display: flex;
  justify-content: flex-end;
`;

const Planets = () => {
  const [allPlanets, setAllPlanets] = useState([]);
  const isGrid = usePageStore((state) => state.isGrid);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets/');
      const data = await response.json();
      setAllPlanets(data.results);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <>
      {allPlanets.length === 0 ? (
        <LoadingText>
          <Text>{`Loading Planets Data`}</Text>
          <img
            style={{ color: 'wheat', width: '30px', height: '30px', margin: '5px', display: 'inline-block' }}
            src={LoadingAnimation}
          ></img>
        </LoadingText>
      ) : isGrid ? (
        <PlanetsGrid>
          {allPlanets.map((planet, index) => (
            <PlanetCard key={index}>
              <PlanetImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} />
              <TitleBox>
                <PlanetTitle>
                  <img src={PlanetIcon} alt="Planet Icon" />
                  <Text>{planet?.name}</Text>
                </PlanetTitle>
                <Option>
                  <img src={OptionIcon} alt="Option Icon" />
                  <DropdownMenu view={isGrid ? 'true' : 'false'}>
                    <DropDownItem onClick={() => console.log(`View`)}>View</DropDownItem>
                    <DropDownItem onClick={() => console.log(`Delete`)}>Download</DropDownItem>
                    <DropDownItem onClick={() => console.log(`Move`)}>Rename</DropDownItem>
                    <DropDownItem onClick={() => console.log(`Rename`)}>Share Link</DropDownItem>
                    <DropDownItem onClick={() => console.log(`Rename`)}>Move</DropDownItem>
                    <DropDownItem onClick={() => console.log(`Rename`)}>MarkPrivate</DropDownItem>
                    <DropDownItem onClick={() => console.log(`Rename`)}>Delete</DropDownItem>
                  </DropdownMenu>
                </Option>
              </TitleBox>
            </PlanetCard>
          ))}
        </PlanetsGrid>
      ) : (
        <TableList>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Climate</TableHeader>
              <TableHeader>Gravity</TableHeader>
            </tr>
          </thead>
          <tbody>
            {allPlanets.map((planet) => (
              <TableRow key={planet.url}>
                <TableColumn>
                  <PlanetTitleList>
                    <img src={PlanetIcon} alt="Planet Icon" />
                    <Text>{planet.name}</Text>
                  </PlanetTitleList>
                </TableColumn>
                <TableColumn>{planet.climate}</TableColumn>
                <TableColumn>{planet.gravity}</TableColumn>
                <TableColumn>
                  <OptionsList>
                    <img src={OptionListIcon} alt="Option List Icon" />
                    <DropdownMenu view={isGrid ? 'true' : 'false'}>
                      <DropDownItem onClick={() => console.log(`View`)}>View</DropDownItem>
                      <DropDownItem onClick={() => console.log(`Delete`)}>Download</DropDownItem>
                      <DropDownItem onClick={() => console.log(`Move`)}>Rename</DropDownItem>
                      <DropDownItem onClick={() => console.log(`Rename`)}>Share Link</DropDownItem>
                      <DropDownItem onClick={() => console.log(`Rename`)}>Move</DropDownItem>
                      <DropDownItem onClick={() => console.log(`Rename`)}>MarkPrivate</DropDownItem>
                      <DropDownItem onClick={() => console.log(`Rename`)}>Delete</DropDownItem>
                    </DropdownMenu>
                  </OptionsList>
                </TableColumn>
              </TableRow>
            ))}
          </tbody>
        </TableList>
      )}
    </>
  );
};

export default Planets;
