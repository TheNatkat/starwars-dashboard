// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SpeciesIcon from '../../assets/speciesicon.svg';
import LoadingAnimation from '../../assets/loading.svg';
import OptionIcon from '../../assets/optionsicon.svg';
import OptionListIcon from '../../assets/optiontransprenticon.svg';
import usePageStore from '../../store/pagestore';
import CloseIcon from '../../assets/closeicon.svg';
import DeleteIcon from '../../assets/deleteicon.svg';
import DownloadIcon from '../../assets/downloadicon.svg';
import MoveIcon from '../../assets/moveicon.svg';
import MovePrivateIcon from '../../assets/moveprivateicon.svg';
import RenameIcon from '../../assets/renameicon.svg';
import ShareIcon from '../../assets/shareicon.svg';
import viewIcon from '../../assets/viewicon.svg';

const SpeciesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  row-gap: 2rem;
`;

const SpeciesCard = styled.div`
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

const SpeciesImage = styled.img`
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

const SpeciesTitle = styled.div`
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

const DropDownItem = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;
  align-items: center;
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
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const TableColumn = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid white;
`;

const SpeciesTitleList = styled.div`
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

const PopupSidebar = styled.div`
  postion: relative;
  display: flex;
  border-left: 1px solid white;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 25vw;
  background-color: #03123d;
  z-index: 1000;
  padding: 1.5rem 1rem;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const PopUpTitleWrapper = styled.div`
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
`;

const PopUpTitle = styled.div`
  color: white;
  margin: 0rem 1rem;
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: 600;
`;

const PopUpCloseWrapper = styled.div`
  bottom: 0%;
  position: absolute;
  border-top: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
`;

const CloseButton = styled.div`
  padding: 0.5rem 0.5rem;
  width: 23vw;
  color: white;
  background-color: #cc1980;
  text-align: center;
  border-radius: 8px;
`;

const PopUpData = styled.div`
  margin: 1rem;
  overflow: scroll;
  marginTop: 2rem;
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start:
  
`;

const PopTextHeading = styled.div`
  margin: 1rem 0rem;
  color: white;
  font-size: 300;
`;

const PopUpText = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
`;

const PopUpImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  z-index: 0;
  border: 1px solid white;
  border-radius: 10px;
`;

// Species component
const Species = () => {
  const [allSpecies, setAllSpecies] = useState([]);
  const isGrid = usePageStore((state) => state.isGrid);
  const [LoadingData, setLoadingData] = useState('Species');
  const [selectedSpecies, setSelected] = useState(null);

  // Fetch species data from the SWAPI
  const fetchSpecies = async () => {
    try {
      // Fetch species data
      const response = await fetch('https://swapi.dev/api/species/');
      const data = await response.json();

      // Set loading data to 'Planet' for the subsequent fetch
      setLoadingData('Planet');

      // Fetch planets data
      const planets = await fetch('https://swapi.dev/api/planets/');
      const planetsData = await planets.json();

      // Update species data with homeworld names
      const updateSpeciesData = data.results.map((item) => {
        let index = -1;
        if (item.homeworld !== null) {
          let urlString = item.homeworld;
          index = Number(urlString[urlString.length - 2]);
          if (index >= planetsData.results.length) index = -1;
        }
        return { ...item, homelandName: index !== -1 ? planetsData.results[index - 1].name : 'N/A' };
      });

      // Set the updated species data
      setAllSpecies(updateSpeciesData);
    } catch (error) {
      console.error('Error fetching species:', error);
    }
  };

  // Fetch species data on component mount
  useEffect(() => {
    fetchSpecies();
  }, []);

  // Close the sidebar for selected species
  const closeSidebar = () => {
    setSelected(null);
  };

  // Render species component

  return (
    <>
      {/* Display loading text if species data is still loading */}
      {allSpecies.length === 0 ? (
        <LoadingText>
          <Text>{`Loading ${LoadingData} Data`}</Text>
          <img
            style={{ color: 'wheat', width: '30px', height: '30px', margin: '5px', display: 'inline-block' }}
            src={LoadingAnimation}
            alt="Loading Animation"
          ></img>
        </LoadingText>
      ) : isGrid ? (
        // Display species in grid view
        <SpeciesGrid>
          {allSpecies.map((species, index) => (
            <SpeciesCard onClick={() => setSelected(species)} key={index}>
              <SpeciesImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} alt="Species" />
              <TitleBox>
                <SpeciesTitle>
                  <img src={SpeciesIcon} alt="Species Icon" />
                  <Text>{species?.name}</Text>
                </SpeciesTitle>
                <Option>
                  <img src={OptionIcon} alt="Option Icon" />
                  <DropdownMenu view={isGrid ? 'true' : 'false'}>
                    <DropDownItem>
                      {' '}
                      <img src={viewIcon}></img>View
                    </DropDownItem>
                    <DropDownItem>
                      <img src={DownloadIcon}></img>Download
                    </DropDownItem>
                    <DropDownItem>
                      <img src={RenameIcon}></img>Rename
                    </DropDownItem>
                    <DropDownItem>
                      <img src={ShareIcon}></img>Share Link
                    </DropDownItem>
                    <DropDownItem>
                      <img src={MoveIcon}></img>Move
                    </DropDownItem>
                    <DropDownItem>
                      <img src={MovePrivateIcon}></img>MarkPrivate
                    </DropDownItem>
                    <DropDownItem style={{ color: 'red' }}>
                      <img src={DeleteIcon}></img>Delete
                    </DropDownItem>
                  </DropdownMenu>
                </Option>
              </TitleBox>
            </SpeciesCard>
          ))}
        </SpeciesGrid>
      ) : (
        // Display species in table view
        <TableList>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Classification</TableHeader>
              <TableHeader>Homeworld</TableHeader>
            </tr>
          </thead>
          <tbody>
            {allSpecies.map((species) => (
              <TableRow onClick={() => setSelected(species)} key={species.url}>
                <TableColumn>
                  <SpeciesTitleList>
                    <img src={SpeciesIcon} alt="Species Icon" />
                    <Text>{species.name}</Text>
                  </SpeciesTitleList>
                </TableColumn>
                <TableColumn>{species.classification}</TableColumn>
                <TableColumn>{species.homelandName}</TableColumn>
                <TableColumn>
                  <OptionsList>
                    <img src={OptionListIcon} alt="Option List Icon" />
                    <DropdownMenu view={isGrid ? 'true' : 'false'}>
                      <DropDownItem>
                        {' '}
                        <img src={viewIcon}></img>View
                      </DropDownItem>
                      <DropDownItem>
                        <img src={DownloadIcon}></img>Download
                      </DropDownItem>
                      <DropDownItem>
                        <img src={RenameIcon}></img>Rename
                      </DropDownItem>
                      <DropDownItem>
                        <img src={ShareIcon}></img>Share Link
                      </DropDownItem>
                      <DropDownItem>
                        <img src={MoveIcon}></img>Move
                      </DropDownItem>
                      <DropDownItem>
                        <img src={MovePrivateIcon}></img>MarkPrivate
                      </DropDownItem>
                      <DropDownItem style={{ color: 'red' }}>
                        <img src={DeleteIcon}></img>Delete
                      </DropDownItem>
                    </DropdownMenu>
                  </OptionsList>
                </TableColumn>
              </TableRow>
            ))}
          </tbody>
        </TableList>
      )}
      {/* Display the sidebar for the selected species */}
      {selectedSpecies && (
        <PopupSidebar>
          <PopUpTitleWrapper>
            <PopUpTitle>{selectedSpecies.name}</PopUpTitle>
            <img onClick={closeSidebar} src={CloseIcon} alt="Close" />
          </PopUpTitleWrapper>
          <PopUpData>
            <PopTextHeading>Image</PopTextHeading>
            <PopUpImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} alt="Species" />
            <PopTextHeading>Name</PopTextHeading>
            <PopUpText>{selectedSpecies.name}</PopUpText>
            <PopTextHeading>Classification</PopTextHeading>
            <PopUpText>{selectedSpecies.classification}</PopUpText>
            <PopTextHeading>Designation</PopTextHeading>
            <PopUpText>{selectedSpecies.designation}</PopUpText>
            <PopTextHeading>Homeworld</PopTextHeading>
            <PopUpText>{selectedSpecies.homelandName}</PopUpText>
            <PopTextHeading>Language</PopTextHeading>
            <PopUpText>{selectedSpecies.language}</PopUpText>
            <PopTextHeading>Average Lifespan</PopTextHeading>
            <PopUpText>{selectedSpecies.average_lifespan}</PopUpText>
          </PopUpData>
          <PopUpCloseWrapper>
            <CloseButton onClick={closeSidebar}>Close</CloseButton>
          </PopUpCloseWrapper>
        </PopupSidebar>
      )}
    </>
  );
};

export default Species;
