import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  noteList: Note[] = [];
  deletedNotes: Note[] = [];
  constructor() {}

  addNote(note: Note): void {
    this.noteList.push(note);
  }
  deleteNote(title: string): void {
    let note: Note[] = this.noteList.filter((notes) => notes.title == title);
    this.deletedNotes = [...this.deletedNotes, ...note];
    console.log(this.deletedNotes);
    this.noteList = this.noteList.filter((notes) => notes.title != title);
  }
  updateNote(note: Note) {
    this.noteList = this.noteList.filter((notes) => notes.title != note.title);
    this.addNote(note);
    console.log(this.noteList);
  }
  getDeletedNotes(): Note[] {
    return this.deletedNotes;
  }
  getNoteList(): Note[] {
    let pinnedList = this.noteList.filter((notes) => notes.pinned);
    let unPinnedList = this.noteList.filter((notes) => !notes.pinned);
    this.noteList = [...pinnedList, ...unPinnedList];
    return this.noteList;
  }
  pinNote(noteTitle: string) {
    this.noteList.forEach((notes) => {
      if (notes.title == noteTitle) {
        notes.pinned = notes.pinned ? false : true;
      }
    });
  }
  checkTitleAvailability(title: string): number {
    if (title == '') {
      return -1;
    }
    let count = 0;
    this.noteList.filter((notes) => {
      if (notes.title == title) {
        count++;
      }
    });
    return count;
  }
  removeDeletedNotes(): void {
    this.deletedNotes = [];
  }
}
