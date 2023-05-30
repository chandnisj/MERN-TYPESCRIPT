import { User } from "../Models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="info" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand >
          Cool Notes App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link >
              Privacy
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
};

export default NavBar;
