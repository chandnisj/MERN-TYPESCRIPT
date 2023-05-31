import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked} variant="dark" className="mx-2" >Sign Up</Button>
      <Button onClick={onLoginClicked} variant="dark" className="mx-2">Log In</Button>
    </>
  );
};

export default NavBarLoggedOutView;
