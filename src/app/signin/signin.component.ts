import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  user = { username: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log(this.user);
    if (this.userService.checkLogin(this.user)) {
      alert('Login Successful...');
      this.router.navigate(['/home', this.user.username]);
    } else {
      alert('login failure - Invalid credentials ');
      this.user.username = '';
      this.user.password = '';
    }
  }
}
