import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import AddNoteDialog from "./Components/AddNoteDialog";
import Note from "./Components/Note";
import { Note as NoteModel } from "./Models/note";
import * as NoteApi from "./network/notes.api";
function App() {
  // const port = "http://localhost:5000";
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      try {
        // eslint-disable-next-line
        const response = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>Add new note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)} />
      )}
    </Container>
  );
}

export default App;
