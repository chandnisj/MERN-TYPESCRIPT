import { useForm } from "react-hook-form";
import { User } from "../Models/user";
import { LoginCredentials } from "../network/notes.api";
import * as NoteApi from "../network/notes.api";
import { Button, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../Styles/utils.module.css";
interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccefull: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccefull }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(Credentials: LoginCredentials) {
    try {
      const user = await NoteApi.login(Credentials);
      onLoginSuccefull(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextInputField
          name="username"
          label="Username"
          type="text"
          placeholder="UserName"
          register={register}
          registerOptions={{ required: "Required" }}
          error={errors.username}
        />
        <TextInputField
          name="password"
          label="password"
          type="password"
          placeholder="password"
          register={register}
          registerOptions={{ required: "Required" }}
          error={errors.password}
        />
        <Button type="submit" disabled={isSubmitting} className={styleUtils.width100} >
            LogIn
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
