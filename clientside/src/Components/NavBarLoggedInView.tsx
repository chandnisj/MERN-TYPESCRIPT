import { User } from "../Models/user";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({user,onLogoutSuccessful}:NavBarLoggedInViewProps) => {

    return(
        <>
        </>
    )
};

export default NavBarLoggedInView;
