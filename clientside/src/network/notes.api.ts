import { Note } from "../Models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const respone = await fetch(input, init);
  if (respone.ok) {
    return respone;
  } else {
    const errorBody = await respone.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const respone = await fetchData("/api/notes", {
    method: "GET",
  });
  return respone.json();
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
