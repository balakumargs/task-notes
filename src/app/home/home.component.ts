import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  label: string = 'All';

  viewFlag = false;

  view: string = 'card';

  username!: string;

  appTitle: string = 'Keep Your Notes Here...';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.username = this.activatedRoute.snapshot.params['id'];
  }

  changeView() {
    if (this.viewFlag) {
      console.log('Flag gonna false');
      this.view = 'card';
      this.viewFlag = false;
    } else {
      console.log('Flag gonna true');
      this.view = 'list';
      this.viewFlag = true;
    }
  }

  setVal(data: string) {
    console.log('received');
    this.label = data;
  }
}
