import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilmIcon from '../../assets/filmicon.svg';
import OptionIcon from '../../assets/optionsicon.svg';
import OptionListIcon from '../../assets/optiontransprenticon.svg';
import usePageStore from '../../store/pagestore';

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

  &:hover {
    filter: grayscale(0%);
    filter: gray;
    -webkit-filter: grayscale(0%);
    filter: none;
    transition: 1s ease;
    transform: scale(0.99);
  }
`;

const FilmImage = styled.img`
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

const FilmTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const Option = styled.div`
  border-radius: 5px;
  cursor: pointer;
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
  border-bottom: 1px solid white; /* Add this line */
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


const Films = () => {
  const [allFilms, setAllFilms] = useState([]);
  const isGrid = usePageStore((state) => state.isGrid);

  const fetchFilms = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      console.log(data.results);
      setAllFilms(data.results);
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <>
      {isGrid ? (
        <FilmsGrid>
          {allFilms.length !== 0 ? (
            allFilms.map((film, index) => (
              <FilmCard key={index}>
                <FilmImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} />
                <TitleBox>
                  <FilmTitle>
                    <img src={FilmIcon} />
                    <Text>{film?.title}</Text>
                  </FilmTitle>
                  <Option>
                    <img src={OptionIcon} />
                  </Option>
                </TitleBox>
              </FilmCard>
            ))
          ) : (
            <Text>Loading Data.....</Text>
          )}
        </FilmsGrid>
      ) : (
        <TableList>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Director</TableHeader>
              <TableHeader>Release Date</TableHeader>
            </tr>
          </thead>
          <tbody>
            {allFilms.map((film, index) => (
              <TableRow key={index}>
                <TableColumn>
                  <FilmTitleList>
                    <img src={FilmIcon} />
                    <Text>{film?.title}</Text>
                  </FilmTitleList>
                </TableColumn>
                <TableColumn>{film.director}</TableColumn>
                <TableColumn>{film.release_date}</TableColumn>
                <TableColumn>
                  <OptionsList>
                    <img src={OptionListIcon} />
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

export default Films;
