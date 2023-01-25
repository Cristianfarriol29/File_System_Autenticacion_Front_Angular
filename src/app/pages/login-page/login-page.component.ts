import { RegisterServiceService } from './../../../services/register-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email: any = ""

  constructor(private loginService: RegisterServiceService, private router: Router) {



  }

  ngOnInit(): void {
  }

  handleLoginForm(loginForm: NgForm) {


    if(loginForm.value.user === "" || loginForm.value.pass === ""){
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `¡¡You can't leave empty fields!!`,
      });
      return
    }

    const userData = {
      email: loginForm.value.user,
      password: loginForm.value.pass
    }
    if (Object.values(userData).length) {
      this.loginService.loginPost(userData).subscribe((data):any => {
        if (data.msg){
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${data.msg}`,
          });

        }


        if (data.email){
          this.email = data.email;
          localStorage.setItem("emailMontenegro", this.email);
          localStorage.setItem("tokenMontenegro", data.token)
          if(localStorage.getItem("linkMontenegro")?.length){
            const enlace = document.createElement("a")
            enlace.href = localStorage.getItem("linkMontenegro")!.toString()
            enlace.click()
            return;
          } else {
            const enlace = document.createElement("a")
            enlace.href = "https://dlab.typsa.net/"
            enlace.click()
            return
          }

        }


      });




    }




  }

}
