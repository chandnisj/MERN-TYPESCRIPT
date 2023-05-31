import { Container } from "react-bootstrap"
import NotesPageLoggedInView from "../Components/NotesPageLoggedInView"
import NotesPageLoggedOutView from "../Components/NotesPageLoggedOutView"
import { User } from "../Models/user";
import styles from "../Styles/NotesPage.module.css";

interface NotePageProps{
    loggedInUser : User | null,
}



const NotesPage=({loggedInUser}:NotePageProps)=>{
  return(
    <Container className={styles.notespage}>
    <>
      {loggedInUser ? (
        <NotesPageLoggedInView />
      ) : (
        <NotesPageLoggedOutView/>
      )}
    </>
  </Container>
  )
}
export default NotesPage