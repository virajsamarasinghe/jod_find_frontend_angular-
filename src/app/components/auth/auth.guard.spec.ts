import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; // Correctly import AuthGuard
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service'; // Import UserAuthService
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') }; // Mock Router
  let userAuthServiceMock: any;

  beforeEach(() => {
    userAuthServiceMock = {
      isAuthenticated: () => of(true), // Mock method
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: UserAuthService, useValue: userAuthServiceMock }, // Provide mock service
      ],
    });
    guard = TestBed.inject(AuthGuard); // Get instance of AuthGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Check if AuthGuard is created
  });

  // Add more tests for your guard logic here
});
