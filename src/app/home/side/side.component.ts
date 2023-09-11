import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent {
  label = 'All';

  @Output()
  eventEmitter = new EventEmitter<string>();

  viewPersonal() {
    console.log('personal clicked');
    this.label = 'Personal';
    this.eventEmitter.emit(this.label);
  }
  viewOfficial() {
    console.log('official clicked');
    this.label = 'Official';
    this.eventEmitter.emit(this.label);
  }

  viewAll() {
    console.log('All clicked');
    this.label = 'All';
    this.eventEmitter.emit(this.label);
  }
  viewGeneral() {
    console.log('general clicked');
    this.label = 'General';
    this.eventEmitter.emit(this.label);
  }
  trash() {
    console.log('Trash clicked');
    this.label = 'Trash';
    this.eventEmitter.emit(this.label);
  }
}
