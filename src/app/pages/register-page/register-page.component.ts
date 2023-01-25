import { Router } from '@angular/router';
import { RegisterServiceService } from './../../../services/register-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  confirmedEmail: string = ""
  verified: any;
  unverified: any;
  verifying: any;
  userExists!: boolean

  constructor(private registerService: RegisterServiceService, public router: Router ) { }

  ngOnInit(): void {
  }



  captureEmail (event: any) {

    this.verified = false;
    this.unverified = false;


    if (event.target.value.length > 5){
      this.verifying = true;

      var sendMailToCompare = new XMLHttpRequest();
      sendMailToCompare.open(
            "POST",
            "https://prod-220.westeurope.logic.azure.com:443/workflows/5903bc00eb884698b77d3fff79895ba1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=X0oVVRcNuRqeiAz2X9Oa09lzXvPY1eb4O2ofFotHauA",
            true
          );

          sendMailToCompare.send(
            JSON.stringify({
              mailContacto: event.target.value
            })
          )

      setTimeout(() => {
        this.registerService.verifyEmail().subscribe(data => {
          data.find((elem: any) => {
                if (event.target.value === elem.mailContacto) {

                  this.verified = true
                  this.unverified = false;
                   this.confirmedEmail = elem.mailContacto
                   this.verifying = false;

                   return this.confirmedEmail
                } else {
                  this.verified = false;
                  this.unverified = true;
                  this.verifying = false;
                  return
                }

          })

        })

      }, 4000);
    } else {

    }

      }

  checkPass(event?: any) {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;
    if (!regexp.test(event.target.value)) {
      console.log("error")
    }else {
      console.log("si")
    }

  }

  sendRegisterForm(formulario: NgForm) {

const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;


if (Object.values(formulario.value).includes("")){
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: '¡There are fields left to fill in, make sure you have completed them all!',
  });
}



if (formulario.value.password !== formulario.value.passwordRepeated) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "¡Passwords don't match!" ,
    });
}

if (formulario.value.password.length < 8 && formulario.value.passwordRepeated.length < 8) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: '¡Password is too short!',
  });
}

if(!regexp.test(formulario.value.password)){
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'The password does not meet the minimum security requirements! Remember that it must have 8 to 12 characters and that it must include at least: One uppercase character, one lowercase character and one number',
  });

}



    const parametro = document.location.href.slice(0 , -8)


    const user = {
      name: formulario.value.name,
      surname: formulario.value.surname,
      email: this.confirmedEmail,
      password: formulario.value.password,
      parametro
    }

    if(!this.confirmedEmail){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡El correo que haz ingresado no tiene permiso para registrarse en dLab!'
      })

    }

   this.registerService.registerPost(user).subscribe((data:any):any =>
    {


      if(data.msg){
        console.log(data.msg)
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${data.msg}`,
        });
      }


      var sendMailToConfirm = new XMLHttpRequest();
      sendMailToConfirm.open(
            "POST",
            "https://prod-86.westeurope.logic.azure.com:443/workflows/76c6387669924aaaad9b3d1a29888bc8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=im8k2g0WN7x2mXqAB-zEO5QNk188CtXm2vZWrd68oOM",
            true
          );

          sendMailToConfirm.send(
            JSON.stringify({
              name: data.name,
              surname: data.surname,
              email: data.email,
              token: data.token,
              parametro
            })
          )


            Swal.fire('Completado!'
            , 'Su formulario de registro se ha completado de manera exitosa. En breve le enviaremos un correo electronico para terminar de confirmar tu registro.'
            , 'success'
            ).then(result => {
              if (result.isConfirmed) {
                formulario.reset()
                this.router.navigate(['login'])
              }
            })


    })





   if (!this.confirmedEmail){

   }

   return true;

}

}
