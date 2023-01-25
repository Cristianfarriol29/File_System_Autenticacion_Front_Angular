import { NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RegisterServiceService } from 'src/services/register-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private petitionService: RegisterServiceService) { }

  ngOnInit(): void {
  }

  assignPermit(form: NgForm) {
    const user = {
      mailContacto: form.value.user
    }
      this.petitionService.assignPermit(user).subscribe((data: any) => {
        Swal.fire('Completado!'
   , `¡Se le ha asignado el permiso al correo ${data.mailContacto}!`
   , 'success'
   ).then(result => {
    if (result.isConfirmed){
      form.reset()
    }
   })
      })
  }


}
