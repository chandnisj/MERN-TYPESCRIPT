import Styles from "../Styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../Models/note";
import styles from "../Styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import StyleUtils from "../Styles/utils.module.css";

interface NoteProps {
  note: NoteModel;
  onNoteCliked: (note: NoteModel) => void;
  onDeleteNoteCliked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onNoteCliked,
  onDeleteNoteCliked,
  className,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  //console.log(note);
  let CreatedUpdatedText: string;
  if (updatedAt > createdAt) {
    CreatedUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    CreatedUpdatedText = "Created:" + formatDate(createdAt);
  }
  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteCliked(note)}
    >
      <Card.Body className={Styles.cardBody}>
        <Card.Title className={StyleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteCliked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={Styles.cardText}>{text}</Card.Text>
        <Card.Footer className="text-muted">{CreatedUpdatedText}</Card.Footer>
      </Card.Body>
    </Card>
  );
};
export default Note;
