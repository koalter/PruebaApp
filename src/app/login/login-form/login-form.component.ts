import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
      this.form.reset();
    }
  }

  fill() {
    this.email?.setValue('e@e.com');
    this.password?.setValue('123456');
  }
}
