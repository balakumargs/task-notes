import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/note';
import { NoteService } from 'src/app/note.service';
import { PopupComponent } from 'src/app/popup/popup.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnChanges {
  @ViewChild('ref') ref!: ElementRef;

  searchText!: any;

  viewList: Note[] = [];

  allFlag = true;

  cardFlag = true;

  @Input()
  view: string = 'card';

  @Input()
  label: string = 'All';

  viewCardCol = 3;

  constructor(private dialog: MatDialog, private noteService: NoteService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['label']) {
      let prop1 = changes['label'].currentValue;

      if (prop1 == 'All') {
        this.viewList = this.noteService.getNoteList();
      } else if (prop1 == 'Trash') {
        this.viewList = this.noteService.getDeletedNotes();
      } else if (
        prop1 == 'Personal' ||
        prop1 == 'Official' ||
        prop1 == 'General'
      ) {
        this.viewList = this.noteService
          .getNoteList()
          .filter((notes) => notes.label == this.label);
      }
    }
    if (changes['view']) {
      let prop2 = changes['view'].currentValue;

      if (prop2 == 'list') {
        console.log('GRID');
        this.cardFlag = false;
        this.viewCardCol = 1;
        this.cardFlag = true;
      } else {
        console.log('LIST');
        this.cardFlag = false;
        this.viewCardCol = 3;
        this.cardFlag = true;
      }
    }
  }
  // scrollToTop() {
  // this.ref.nativeElement.scrollTop = 0;
  // }

  openPopup() {
    let dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',
      height: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((notes) => {
      if (notes) {
        console.log(notes);
        this.noteService.addNote(notes);
        this.allFlag = false;
        if (this.label == 'All') {
          this.viewList = this.noteService.getNoteList();
        } else if (this.label == 'Trash') {
          this.viewList = this.noteService.getDeletedNotes();
        } else {
          this.viewList = this.noteService
            .getNoteList()
            .filter((note) => note.label == this.label);
        }
        this.allFlag = true;
      }
    });
  }
  pinMe(noteTitle: string) {
    this.allFlag = false;
    this.noteService.pinNote(noteTitle);
    this.viewList = this.noteService.getNoteList();
    this.allFlag = true;
  }

  deleteNote(noteTitle: string) {
    this.allFlag = false;
    this.noteService.deleteNote(noteTitle);
    if (this.label == 'Trash') {
      this.viewList = this.noteService.getDeletedNotes();
    } else if (this.label == 'All') {
      this.viewList = this.noteService.getNoteList();
    } else {
      this.viewList = this.noteService
        .getNoteList()
        .filter((notes) => notes.label == this.label);
    }
    this.allFlag = true;
  }
  changeCardVal(event: any, notesTitle: string, taskId: number) {
    let index = this.noteService
      .getNoteList()
      .findIndex((notes) => notes.title == notesTitle);
    let idx = this.viewList[index].tasks.findIndex(
      (taskItem) => taskItem.id == taskId
    );
    this.viewList[index].tasks[idx].status = event.target.checked;
  }

  deleteCardVal(notesTitle: string, taskId: number) {
    let index = this.viewList.findIndex((notes) => notes.title == notesTitle);
    this.viewList[index].tasks = this.viewList[index].tasks.filter(
      (task) => task.id !== taskId
    );
  }
  filter() {
    if (this.label == 'Trash') {
      this.viewList = this.noteService.getDeletedNotes();
    } else if (this.label == 'All') {
      this.viewList = this.noteService.getNoteList();
    } else {
      this.viewList = this.noteService
        .getNoteList()
        .filter((notes) => notes.label == this.label);
    }
    this.viewList = this.viewList.filter((notes) =>
      notes.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  editPopup(note: Note) {
    let dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',
      height: '450px',
      data: note,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((notes) => {
      if (notes) {
        console.log('From Edit' + JSON.stringify(notes));
        this.noteService.updateNote(notes);
        this.allFlag = false;
        if (this.label == 'All') {
          this.viewList = this.noteService.getNoteList();
        } else {
          this.viewList = this.noteService
            .getNoteList()
            .filter((note) => note.label == this.label);
        }

        this.allFlag = true;
      }
    });
  }
  emptyTrash() {
    this.viewList = [];
    this.noteService.removeDeletedNotes();
  }
  clearFilter() {
    this.allFlag = false;
    if (this.label == 'All') {
      this.viewList = this.noteService.getNoteList();
    } else if (this.label == 'Trash') {
      this.viewList = this.noteService.getDeletedNotes();
    } else {
      this.viewList = this.noteService
        .getNoteList()
        .filter((note) => note.label == this.label);
    }
    this.allFlag = true;
    this.searchText = '';
  }
}
