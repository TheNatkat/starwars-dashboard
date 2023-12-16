// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PersonIcon from '../../assets/personicon.svg';
import OptionIcon from '../../assets/optionsicon.svg';
import OptionListIcon from '../../assets/optiontransprenticon.svg';
import usePageStore from '../../store/pagestore';
import LoadingAnimation from '../../assets/loading.svg';
import CloseIcon from '../../assets/closeicon.svg';
import DeleteIcon from '../../assets/deleteicon.svg';
import DownloadIcon from '../../assets/downloadicon.svg';
import MoveIcon from '../../assets/moveicon.svg';
import MovePrivateIcon from '../../assets/moveprivateicon.svg';
import RenameIcon from '../../assets/renameicon.svg';
import ShareIcon from '../../assets/shareicon.svg';
import viewIcon from '../../assets/viewicon.svg';

// Styled components for styling
const PeopleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  row-gap: 2rem;
`;

const PersonCard = styled.div`
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

const PersonImage = styled.img`
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

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  background-color: rgba(249, 250, 253, 0.2);
  border-radius: 10px;
  padding: 1rem;
`;

const PersonTitle = styled.div`
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
  border-bottom: 1px solid white; /* Add this line */
`;

const PersonTitleList = styled.div`
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

const LoadingText = styled.div`
  color: white;
  text-align: center;

  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-item: center;
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

// People component
const People = () => {
  const [allPeople, setAllPeople] = useState([]);
  const isGrid = usePageStore((state) => state.isGrid);
  const [LoadingData, setLoadingData] = useState('People');
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Fetch people data from the SWAPI
  const fetchPeople = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      setLoadingData('Species');
      const species = await fetch('https://swapi.dev/api/species/');
      const speciesData = await species.json();

      // Update people data with species information
      const updatePeopleData = data.results.map((item) => {
        let index = -1;
        if (item.species.length > 0) {
          let urlString = item.species[0];
          index = Number(urlString[urlString.length - 2]);
          if (index >= speciesData.results.length) index = -1;
        }
        return { ...item, speciestype: index !== -1 ? speciesData.results[index - 1].name : 'N/A' };
      });

      setAllPeople(updatePeopleData);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  // Close the sidebar for selected person
  const closeSidebar = () => {
    setSelectedPerson(null);
  };

  // Fetch people data on component mount
  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      {allPeople.length === 0 ? (
        <LoadingText>
          <Text>{`Loading ${LoadingData} Data`}</Text>
          <img
            style={{ color: 'wheat', width: '30px', height: '30px', margin: '5px', display: 'inline-block' }}
            src={LoadingAnimation}
          ></img>
        </LoadingText>
      ) : isGrid ? (
        <PeopleGrid>
          {allPeople.map((person, index) => (
            <PersonCard onClick={() => setSelectedPerson(person)} key={index}>
              <PersonImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} />
              <TitleBox>
                <PersonTitle>
                  <img src={PersonIcon} alt="Person Icon" />
                  <Text>{person?.name}</Text>
                </PersonTitle>
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
            </PersonCard>
          ))}
        </PeopleGrid>
      ) : (
        <TableList>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Birth Year</TableHeader>
              <TableHeader>Species</TableHeader>
            </tr>
          </thead>
          <tbody>
            {allPeople.map((person) => (
              <TableRow onClick={() => setSelectedPerson(person)} key={person.url}>
                <TableColumn>
                  <PersonTitleList>
                    <img src={PersonIcon} alt="Person Icon" />
                    <Text>{person.name}</Text>
                  </PersonTitleList>
                </TableColumn>
                <TableColumn>{person.birth_year}</TableColumn>
                <TableColumn>{person.speciestype}</TableColumn>
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
      {selectedPerson && (
        <PopupSidebar>
          <PopUpTitleWrapper>
            <PopUpTitle>{selectedPerson.name}</PopUpTitle>
            <img onClick={closeSidebar} src={CloseIcon} alt="Close" />
          </PopUpTitleWrapper>
          <PopUpData>
            <PopTextHeading>Image</PopTextHeading>
            <PopUpImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} alt="Person" />
            <PopTextHeading>Name</PopTextHeading>
            <PopUpText>{selectedPerson.name}</PopUpText>
            <PopTextHeading>Birth Year</PopTextHeading>
            <PopUpText>{selectedPerson.birth_year}</PopUpText>
            <PopTextHeading>Gender</PopTextHeading>
            <PopUpText>{selectedPerson.gender}</PopUpText>
            <PopTextHeading>Height</PopTextHeading>
            <PopUpText>{selectedPerson.height} cm</PopUpText>
            <PopTextHeading>Eye Color</PopTextHeading>
            <PopUpText>{selectedPerson.eye_color} cm</PopUpText>
            <PopTextHeading>Weight</PopTextHeading>
            <PopUpText>{selectedPerson.mass} cm</PopUpText>
            <PopTextHeading>Skin Color</PopTextHeading>
            <PopUpText>{selectedPerson.skin_color} cm</PopUpText>
          </PopUpData>
          <PopUpCloseWrapper>
            <CloseButton onClick={closeSidebar}>Close</CloseButton>
          </PopUpCloseWrapper>
        </PopupSidebar>
      )}
    </>
  );
};

export default People;
