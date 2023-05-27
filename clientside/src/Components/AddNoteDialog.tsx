import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../Models/note";
import { NoteInput } from "../network/notes.api";
import * as NotesApi from "../network/notes.api";
interface AddNoteDialogProps {
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NotesApi.CreateNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={() => onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addNoteForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
