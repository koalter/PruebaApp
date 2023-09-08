import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  @Output() onSubmit = new EventEmitter();
  form!: FormGroup;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(private fb: FormBuilder,
    private loginSvc: LoginService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  async submit() {
    const loadingElement = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    if (this.form.valid) {
      await loadingElement.present();
      const result = await this.loginSvc.login(this.email?.value, this.password?.value);
      await loadingElement.dismiss();
      this.onSubmit.emit(result);
      this.form.reset();
    }
  }

  fill() {
    this.email?.setValue('e@e.com');
    this.password?.setValue('123456');
  }
}
