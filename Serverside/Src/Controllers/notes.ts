import { RequestHandler } from "express";
import NoteModel from "../Models/note";
import mongoose from "mongoose";
import createHttpError from "http-errors";
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    //throw createHttpError(401);
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  // let id = mongoose.Types.ObjectId(id);
  //console.log(noteId);
  const noteId = req.params.noteId;
  try {
    const objectId = new mongoose.Types.ObjectId(noteId);
    if (!mongoose.isValidObjectId(objectId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findById(objectId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json(note);
    //console.log(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Note Must have a Title!..");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface updateNoteParams {
  noteId: string;
}

interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    // const objectId = new mongoose.Types.ObjectId(noteId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Note Must have a title");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not Found");
    }
    note.title = newTitle;
    note.text = newText;
    const updateNote = await note.save();
    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    await note.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
