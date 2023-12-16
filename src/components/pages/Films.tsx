import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilmIcon from '../../assets/filmicon.svg';
import LoadingAnimation from '../../assets/loading.svg';
import OptionIcon from '../../assets/optionsicon.svg';
import CloseIcon from '../../assets/closeicon.svg';
import OptionListIcon from '../../assets/optiontransprenticon.svg';
import usePageStore from '../../store/pagestore';
import DeleteIcon from '../../assets/deleteicon.svg';
import DownloadIcon from '../../assets/downloadicon.svg';
import MoveIcon from '../../assets/moveicon.svg';
import MovePrivateIcon from '../../assets/moveprivateicon.svg';
import RenameIcon from '../../assets/renameicon.svg';
import ShareIcon from '../../assets/shareicon.svg';
import viewIcon from '../../assets/viewicon.svg';

const FilmsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  row-gap: 2rem;
`;

const FilmCard = styled.div`
  width: 23vw;
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -webkit-transition: all 1s ease;
  z-index: 1;

  &:hover {
    filter: grayscale(0%);
    filter: gray;
    -webkit-filter: grayscale(0%);
    filter: none;
    transition: 1s ease;
    transform: scale(0.99);
    z-index: 1;
  }
`;

const FilmImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  z-index: 0;
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
  align-items: center;
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

const FilmTitle = styled.div`
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
  bottom: ${(props) => (props.view != 'true' ? '' : '100%')};
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
  padding: 1rem;
  background-color: #4d5875;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const TableColumn = styled.td`
  padding: 1rem;

  border-bottom: 1px solid white;
`;

const FilmTitleList = styled.div`
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

const Films = () => {
  const [allFilms, setAllFilms] = useState([]);
  const isGrid = usePageStore((state) => state.isGrid);
  const [selectedFilm, setSelectedFilm] = useState(null);

  // Fetch films data from the SWAPI
  const fetchFilms = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      setAllFilms(data.results);
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  // Close the sidebar for selected film
  const closeSidebar = () => {
    setSelectedFilm(null);
  };

  // Fetch films data on component mount
  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <>
      {allFilms.length === 0 ? (
        <LoadingText>
          <Text>{`Loading Films Data`}</Text>
          <img
            style={{ color: 'wheat', width: '30px', height: '30px', margin: '5px', display: 'inline-block' }}
            src={LoadingAnimation}
          ></img>
        </LoadingText>
      ) : isGrid ? (
        <FilmsGrid>
          {allFilms.map((film, index) => (
            <FilmCard onClick={() => setSelectedFilm(film)} key={index}>
              <FilmImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} />
              <TitleBox>
                <FilmTitle>
                  <img src={FilmIcon} alt="Film Icon" />
                  <Text>{film?.title}</Text>
                </FilmTitle>
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
            </FilmCard>
          ))}
        </FilmsGrid>
      ) : (
        <TableList>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Director</TableHeader>
              <TableHeader>Release Date</TableHeader>
              <TableHeader></TableHeader>
            </tr>
          </thead>
          <tbody>
            {allFilms.map((film) => (
              <TableRow onClick={() => setSelectedFilm(film)} key={film.episode_id}>
                <TableColumn>
                  <FilmTitleList>
                    <img src={FilmIcon} alt="Film Icon" />
                    <Text>{film.title}</Text>
                  </FilmTitleList>
                </TableColumn>
                <TableColumn>{film.director}</TableColumn>
                <TableColumn>{film.release_date}</TableColumn>
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

      {selectedFilm && (
        <PopupSidebar>
          <PopUpTitleWrapper>
            <PopUpTitle>{selectedFilm.title}</PopUpTitle>
            <img onClick={closeSidebar} src={CloseIcon}></img>
          </PopUpTitleWrapper>
          <PopUpData>
            <PopTextHeading>Image</PopTextHeading>
            <PopUpImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} />
            <PopTextHeading>Name</PopTextHeading>
            <PopUpText>{selectedFilm.title}</PopUpText>
            <PopTextHeading>Release Date</PopTextHeading>
            <PopUpText>{selectedFilm.release_date}</PopUpText>
            <PopTextHeading>Director</PopTextHeading>
            <PopUpText>{selectedFilm.director}</PopUpText>
            <PopTextHeading>Producer</PopTextHeading>
            <PopUpText>{selectedFilm.producer}</PopUpText>
            <PopTextHeading>Summary</PopTextHeading>
            <PopUpText>{selectedFilm.opening_crawl}</PopUpText>
          </PopUpData>

          <PopUpCloseWrapper>
            <CloseButton onClick={closeSidebar}>Close</CloseButton>
          </PopUpCloseWrapper>
        </PopupSidebar>
      )}
    </>
  );
};

export default Films;
