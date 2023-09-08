import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router,
    private alertCtrl: AlertController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  login(ev: any) {
    if (ev) {
      this.router.navigate(['home']);
    } else {
      this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      }).then(alert => alert.present());
    }
  }
}
