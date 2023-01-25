import { RegisterServiceService } from './../../../../services/register-service.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss']
})
export class UserConfirmComponent implements OnInit {

  msgOfTheResponse: string = ""
  token: string = ""

  constructor(private confirmService: RegisterServiceService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.token = params['token']
      this.confirmService.userConfirm(this.token).subscribe((data:any) => {
        this.msgOfTheResponse = data.msg
      })
    })

  }

}
