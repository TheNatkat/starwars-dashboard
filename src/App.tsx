import styled from 'styled-components';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MidSection from './components/MidSection';

// Styled components for styling
const Main = styled.section`
  background-color: #03123d;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.section`
  display: flex;
`;

// App component
const App = () => {
  return (
    <Main>
      {/* Navbar component */}
      <Navbar />
      {/* Content wrapper containing Sidebar and MidSection components */}
      <ContentWrapper>
        {/* Sidebar component */}
        <Sidebar />
        {/* MidSection component */}
        <MidSection />
      </ContentWrapper>
    </Main>
  );
};

export default App;
