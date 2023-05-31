import { useForm } from "react-hook-form";
import { User } from "../Models/user";
import { LoginCredentials } from "../network/notes.api";
import * as NoteApi from "../network/notes.api";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../Styles/utils.module.css";
import { useState } from "react";
import { unauthorizedError } from "../errors/http_errors";
interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccefull: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccefull }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

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
      if (error instanceof unauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }

      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            variant="info"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Log-In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
