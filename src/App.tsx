
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MidSection from './components/MidSection';

const Main = styled.section`
  background-color:  #03123D;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const ContentWapper = styled.section`
  display: flex;
`;

const App = () => {
  return <Main>
    <Navbar/>
    <ContentWapper>
    <Sidebar/>
    <MidSection/>
    </ContentWapper>
  </Main>;
};

export default App;
