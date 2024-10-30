import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { ILogin, IResLogin } from '../interfaces/login';
import { IRegister } from '../interfaces/register';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class DataAuthService {
  constructor() {
    const helper = new JwtHelperService();
    const token = this.getToken();

    if (!token) return;

    const decodedToken = helper.decodeToken(token);

    if (token) {
      if (!this.user)
        this.user = {
          username: decodedToken.username,
          token: token,
          admin: decodedToken.admin ? true : false,
        };
      else this.user!.token = token;
    }
  }

  user: IUser | undefined;

  async login(loginData: ILogin) {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (res.status !== 200) return;

    const resJson: IResLogin = await res.json();

    if (!resJson.token) return;

    this.user = {
      username: loginData.username,
      token: resJson.token,
      admin: false,
    };

    localStorage.setItem('authToken', resJson.token);

    const userDetailsRes = await fetch(
      environment.API_URL +
      `usuarios/${encodeURIComponent(loginData.username)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${resJson.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (userDetailsRes.status !== 200) return;

    const userDetailsResJson = await userDetailsRes.json();

    this.user.admin = userDetailsResJson.admin;

    return userDetailsRes;
  }

  async register(regData: IRegister) {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(regData),
    });

    if (res.status != 201) return;
    return res;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  clearToken() {
    localStorage.removeItem('authToken');
    this.user = {
      username: '',
      token: '',
      admin: false
    }
  }
}
