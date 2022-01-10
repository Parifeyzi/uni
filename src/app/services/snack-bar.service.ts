import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: any, panel: any): any {
    this.snackBar.open(message , '', {
      panelClass: panel,
      duration: 3000,
    });
  }
}
