import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilmIcon from '../../assets/filmicon.svg';
import OptionIcon from '../../assets/optionsicon.svg';
import usePageStore from '../../store/pagestore';

const PageWrapper = styled.div``;

const HeadingSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
background-color: rgba(249, 250, 253, 0.20);
border-radius: 10px;
padding: 1rem;
: 
`;

const FilmTitle = styled.div`
display: flex;
align-item: center;
column-gap: 0.5rem;
justify-content: center;
color: white;
font-size: 1rem
: 
`;

const Option = styled.div`
background-color: rgba(
: 
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
    <PageWrapper>
      <FilmsGrid>
        {allFilms.length !== 0 ? (
          allFilms.map((film, index) => (
            isGrid ? <FilmCard key={index}>
              <FilmImage src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`} />
              <TitleBox>
                <FilmTitle>
                  <img src={FilmIcon} />
                  <Text>{film?.title}</Text>
                </FilmTitle>
                <img src={OptionIcon} />
              </TitleBox>
            </FilmCard> : <TableList>
                
            </TableList>
          ))
        ) : (
          <Text>Loading Data.....</Text>
        )}
      </FilmsGrid>
    </PageWrapper>
  );
};

export default Films;
