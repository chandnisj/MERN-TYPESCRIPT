import Styles from "../Styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../Models/note";
import styles from "../Styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let CreatedUpdatedText: string;
  if (updatedAt > createdAt) {
    CreatedUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    CreatedUpdatedText = "Created:" + formatDate(createdAt);
  }
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={Styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={Styles.cardText}>{text}</Card.Text>
        <Card.Footer className="text-muted">{CreatedUpdatedText}</Card.Footer>
      </Card.Body>
    </Card>
  );
};
export default Note;
