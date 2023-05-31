import { Button, Navbar } from "react-bootstrap";
import { User } from "../Models/user";
import * as NoteApi from "../network/notes.api";
interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NoteApi.logout();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="mb-2">signed in as : {user.username}</Navbar.Text>
      <Button onClick={logout} variant="dark" className="mx-2">Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;
