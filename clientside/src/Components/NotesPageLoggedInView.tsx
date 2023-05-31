import { FaPlus } from "react-icons/fa";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import AddEditNoteDialog from "../Components/AddEditNoteDialog";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "../Models/note";
import styleutil from "../Styles/utils.module.css";
import * as NoteApi from "../network/notes.api";
import Note from "../Components/Note";
import styles from "../Styles/NotesPage.module.css";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const response = await NoteApi.fetchNotes();
        setNotes(response);
        // console.log(response);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
    // eslint-disable-next-line
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NoteApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.length > 0 &&
        notes.map((note) => {
          //console.log(notes)
          return (
            <Col key={note._id}>
              <Note
                note={note}
                className={styles.note}
                onNoteCliked={setNoteToEdit}
                onDeleteNoteCliked={deleteNote}
              />
            </Col>
          );
        })}
    </Row>
  );

  return (
    <>
      <Button
        variant="info"
        onClick={() => setShowAddNoteDialog(true)}
        className={`mb-4 my-3 ${styleutil.blockCenter} ${styleutil.flexCenter}`}
      >
        <FaPlus />
        Add new Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="info" />}
      {showNotesLoadingError && (
        <p>Somthing went wrong.please refresh the page</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet. </p>}
        </>
      )}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updateNote._id ? updateNote : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
