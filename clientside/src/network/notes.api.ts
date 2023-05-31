import { ConflictError, unauthorizedError } from "../errors/http_errors";
import { Note } from "../Models/note";
import { User } from "../Models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const respone = await fetch(input, init);
  if (respone.ok) {
    return respone;
  } else {
    const errorBody = await respone.json();
    const errorMessage = errorBody.error;
    if (respone.status === 401) {
      throw new unauthorizedError(errorMessage);
    } else if (respone.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed with status:" +
          respone.status +
          " message: " +
          errorMessage
      );
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const respone = await fetchData("/api/users", {
    method: "GET",
  });
  return respone.json();
}

export interface signUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: signUpCredentials): Promise<User> {
  const respone = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return respone.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const respone = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return respone.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchNotes(): Promise<Note[]> {
  const respone = await fetchData("/api/notes", {
    method: "GET",
  });
  return respone.json();
  //console.log(respone);
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function CreateNote(note: NoteInput): Promise<Note> {
  const respone = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return respone.json();
}

export async function UpdateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const respone = await fetchData("/api/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return respone.json();
}

export async function deleteNote(noteId: string) {
  await fetchData("/api/notes/" + noteId, { method: "DELETE" });
}
