
import styled from 'styled-components';
import Navbar from './components/Navbar';

const Main = styled.section`
  background-color:  #03123D;
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  return <Main>
    <Navbar></Navbar>
  </Main>;
};

export default App;
