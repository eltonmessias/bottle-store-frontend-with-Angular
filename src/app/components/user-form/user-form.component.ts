import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';




@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  users: User[] = [];

  user: User = {
    username: '',
    fullName: '',
    email: '',
    phone: '',
    role: '',
  };

  saveUser() {
    const index = this.users.findIndex(u => u.username === this.user.username);
    if (index !== -1) {
      this.users[index] = { ...this.user }; // Update existing
    } else {
      this.users.push({ ...this.user }); // Add new
    }
    this.resetForm();
  }

  resetForm() {
    this.user = {

      username: '',
      fullName: '',
      email: '',
      phone: '',
      role: '',
    };
  }

}
