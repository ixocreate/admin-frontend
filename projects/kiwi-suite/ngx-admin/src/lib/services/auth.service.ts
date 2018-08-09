import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
  private authStatus: BehaviorSubject<boolean>;
  private readonly jwtHelper = new JwtHelperService();

  constructor(protected config: ConfigService) {
    this.authStatus = new BehaviorSubject(this.isAuthenticated());
  }

  /**
   * @description Stream of auth status changes
   */
  getAuthStatusChanges(): Observable<boolean> {
    return this.authStatus.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * @description Check if auth state has changed
   */
  private checkAuthStatus() {
    this.authStatus.next(this.isAuthenticated());
  }

  /**
   * @description Set a new JWT token
   */
  setToken(token: string) {
    localStorage.setItem(this.config.namespace + 'AuthToken', token);
    this.checkAuthStatus();
  }

  /**
   * @description Get a saved JWT token
   */
  getToken(): string {
    const token = localStorage.getItem(this.config.namespace + 'AuthToken');
    this.checkAuthStatus();
    return !this.jwtHelper.isTokenExpired(token) ? token : null;
  }

  /**
   * @description Get a saved decoded JWT token Data
   */
  getTokenData(): string {
    const token = localStorage.getItem(this.config.namespace + 'AuthToken');
    this.checkAuthStatus();
    return !this.jwtHelper.isTokenExpired(token) ? this.jwtHelper.decodeToken(token) : null;
  }

  /**
   * @description Removes a saved JWT token
   */
  clearToken() {
    localStorage.removeItem(this.config.namespace + 'AuthToken');
    this.checkAuthStatus();
  }

  /**
   * @description Check if user is authenticated
   */
  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem(this.config.namespace + 'AuthToken');
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      setTimeout(() => this.clearToken(), 0);
      return false;
    }
  }

}
