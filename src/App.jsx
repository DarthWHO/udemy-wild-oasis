import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import styled from "styled-components";

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <div>
      <>
        <GlobalStyles />
        <StyledApp>
          <Row>
            <Row type="horizontal">
              <Heading as="h1">The Wild Oasis</Heading>
              <div>
                <Heading as="h2">Admin Page</Heading>
                <Button size="medium" variation="primary">
                  Check In
                </Button>
                <Button size="medium" variation="secondary">
                  Check Out
                </Button>
              </div>
            </Row>
            <Row>
              <Heading as="h3">Form</Heading>
              <div>
                <Input placeholder="Type here..."></Input>
                <Input placeholder="Type here..." />
              </div>
            </Row>
          </Row>
        </StyledApp>
      </>
    </div>
  );
}

export default App;
