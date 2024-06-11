import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the login function from API
jest.mock('app/api');
  /*
    This test verifies that the user can log in to the application with api call
    */
  describe('Login Component', () => {
    test('should display success message on successful login', async () => {
      // Mock a successful login response
      const user = {
        id: 1,
        username: 'testuser',
      };
      const successResponse = {
        data: {
          success: true,
          user,
        },
      };
      // Set up the mock to return the success response
      const loginMock = require('app/api').login;
      loginMock.mockResolvedValueOnce(successResponse);
  
      // Render the Login component
      render(<Router><Login api={require('app/api')} ></Login>/</Router>);
  
      // Fill in the form fields
      fireEvent.change(screen.getByTestId('email-input'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByTestId('password-input'), {
        target: { value: 'password123' },
      });
  
      // Submit the form
      fireEvent.click(screen.getByTestId('submit-button'));
  
      // Wait for the success message to appear
      // Wait for the success message to appear
    await waitFor(() => {
        const successSnackbar = screen.getByTestId('success-snackbar');
        expect(successSnackbar).toBeInTheDocument();
        expect(successSnackbar).toHaveTextContent('Login successful!');
    });
    });
});
