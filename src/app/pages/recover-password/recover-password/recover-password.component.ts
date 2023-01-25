import { RegisterServiceService } from './../../../../services/register-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  token: string = ""
  constructor(private recoverService: RegisterServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.token = params['token']
    })
  }

  generateANewPassword(formValues: NgForm) {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

    if (formValues.value.pass !== formValues.value.passRepeated){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Los passwords no coinciden!',
      });
    }

    if (formValues.value.pass.length < 8 && formValues.value.passRepeated.length < 8) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡El password es demasiado corto!',
      });
    }

    if(!regexp.test(formValues.value.pass)){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡El password no cumple con los requisitos minimos de seguridad!. Recuerda que debe tener de 8 a 12 caracteres y que debe incluir minimo: Un caracter en mayúscula, uno en minúscula, un número y un carácter especial',
      });

    }

    const passwordChanged = {
      password: formValues.value.pass
    }


    this.recoverService.sendPassToUpdate(passwordChanged, this.token).subscribe((data:any) => {
      Swal.fire('Completado!'
   , `${data.msg}`
   , 'success'
   ).then(result => {
     if (result.isConfirmed) {
       formValues.reset()
       this.router.navigate([''])
     }
   })
    })

    return true






  }

}
