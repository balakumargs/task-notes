import { Component, Inject, Optional } from '@angular/core';
import { Task } from '../task';
import { Note } from '../note';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  username!: string;

  editFlag = false;

  title: string = '';

  saveFlag = true;

  taskName: string = '';

  taskList: Task[] = [];

  label: string = 'General';

  flag = false;

  allFlag = true;

  noteData!: Note;

  closeIcon = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<PopupComponent, Note>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Note
  ) {
    this.username = this.activatedRoute.snapshot.params['id'];
    if (data) {
      this.editFlag = true;
      this.title = data.title;
      this.label = data.label;
      this.taskList = data.tasks;
      this.flag = true;
    } else {
      this.editFlag = false;
    }
    this.checkTitle();
  }

  popSave() {
    this.flag = true;
    console.log('save clicked');
    let note: Note = {
      title: this.title,
      label: this.label,
      tasks: this.taskList,
      pinned: false,
    };
    if (this.editFlag) {
      note.pinned = this.data.pinned;
    }
    this.taskList = [];
    this.title = '';
    this.taskName = '';
    this.flag = false;
    this.label = 'General';
    this.editFlag = false;
    this.dialogRef.close(note);
  }
  resetDialog() {
    this.taskList = [];
    this.title = '';
    this.taskName = '';
    this.flag = false;
    this.label = 'General';
    this.editFlag = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }
  addTask() {
    this.flag = true;
    this.taskList.push({
      id: this.taskList.length,
      item: this.taskName,
      status: false,
    });
    console.log(this.taskList);
    this.taskName = '';
  }
  delete(id: number) {
    console.log('deleting....' + id);
    this.taskList = this.taskList.filter((task) => task.id !== id);
  }
  changeVal(event: any, id: number) {
    let idx = this.taskList.findIndex((taskItem) => taskItem.id == id);
    this.taskList[idx]['status'] = event.target.checked;
  }

  checkTitle() {
    let c = this.noteService.checkTitleAvailability(this.title);
    console.log(c);
    if (c == -1 || c > 1) {
      this.saveFlag = true;
    } else if (c == 1 && !this.editFlag) {
      this.saveFlag = true;
    } else {
      this.saveFlag = false;
    }
  }

  // showIcon() {
  //   this.closeIcon = true;
  // }
  // hideIcon() {
  //   this.closeIcon = false;
  // }
}
