import { Injectable } from '@angular/core';
import { EMUser } from './models/emuser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: EMUser;
}
