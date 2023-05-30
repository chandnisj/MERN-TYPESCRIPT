import { useForm } from "react-hook-form";
import { User } from "../Models/user";
import { signUpCredentials } from "../network/notes.api";
import * as NoteApi from "../network/notes.api";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../Styles/utils.module.css";
interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpCredentials>();

  async function onSubmit(Credentials: signUpCredentials) {
    try {
      const newUser = await NoteApi.signUp(Credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>Sign Up</Modal.Header>
      <Modal.Body>
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
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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
            Sign-Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
