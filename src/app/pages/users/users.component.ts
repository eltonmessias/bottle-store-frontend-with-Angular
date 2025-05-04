import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';




@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  users: User[]= []

  constructor(private userService:UserService){}

  ngOnInit(): void {
      this.getAllUsers()
  }



  getAllUsers():void{
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data
        console.log("users: ", data)
      }, 
      error: (err) => {
        console.error("No Users found!")
      }
    })

  }

  

  

  // editUser(user: User) {
  //   this.user = { ...user };
  // }

  // deleteUser(user: User) {
  //   this.users = this.users.filter(u => u !== user);
  // }

  

}
