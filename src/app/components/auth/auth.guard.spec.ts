import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; // Correctly import AuthGuard
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Provide any dependencies required by AuthGuard here
        AuthGuard,
        { provide: Router, useValue: {} } // Mock Router if necessary
      ],
    });
    guard = TestBed.inject(AuthGuard); // Get instance of AuthGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Check if AuthGuard is created
  });

  // Add more tests for your guard logic here
});
