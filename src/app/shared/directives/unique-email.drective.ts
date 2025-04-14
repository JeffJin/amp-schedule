import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, Observable, of, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../data/services/auth.service';
import { Utils } from '../../data/services/utils';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if(!Utils.isValidEmail(control.value)) {
      return of(null);
    }
    return control.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((email) => {
        return this.authService.isEmailTaken(email).pipe(
          map((isTaken) => {
            return (isTaken ? { emailTaken: true } : null );
          }),
          catchError(() => of(null)),
        );
      }),
      first()
    );

  }
}
