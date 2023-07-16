import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'amb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  passwordHide = true;
  fg!: FormGroup;
  patternEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  patternEmailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  fb: FormBuilder = new FormBuilder();

  domainsAllowed = ['company1.com', 'company2.com', 'company3.com'];

  constructor() {
    this.setForm();
  }

  setVisibility() {
    this.passwordHide = !this.passwordHide;
  }

  setForm() {
    /*this.fg = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.patternEmailRegEx),
      ]),
      password: new FormControl(null, Validators.required),
    });*/

    const controls = {
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(this.patternEmailRegEx),
          //this.validateEmailDomain.bind(this),
          this.validateEmailDomainAllowed(this.domainsAllowed),
        ],
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          this.verifyPassswordAndConfirm,
        ],
      ],
    };

    this.fg = this.fb.group(controls, {
      validators: this.validateFieldsPassword,
    });
  }

  login() {
    console.log(this.fg);
    if (this.fg.valid) {
      console.log('Form is valid');
      //console.log(this.fg.value);
      console.log(this.fg.getRawValue());
    } else {
      console.log('Form is invalid');
    }
  }

  validateFieldsPassword(formGroup: FormGroup): ValidationErrors | null {
    if (!formGroup) return null;

    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    if (password === confirmPassword) return null;

    return { passwordsDontMatch: true };
  }

  validateEmailDomain(control: AbstractControl) {
    if (!control || !control.value) return null;

    const partsEmail = control.value.split('@');
    if (partsEmail.length <= 1) return null;

    const domain = partsEmail[1];
    if (this.domainsAllowed.indexOf(domain) > -1) return null;

    return { domainNotAllowed: true };
  }

  verifyPassswordAndConfirm(control: AbstractControl) {
    if (!control) return null;

    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.parent?.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    if (password === confirmPassword) return null;

    return { passwordsDontMatch: true };
  }

  validateEmailDomainAllowed(domainsAllowed: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control || !control.value) return null;

      const partsEmail = control.value.split('@');
      if (partsEmail.length <= 1) return null;

      const domain = partsEmail[1];
      if (domainsAllowed.indexOf(domain) > -1) return null;

      return { domainNotAllowed: true };
    };
  }
}