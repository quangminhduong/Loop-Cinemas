import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';

import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('app/api');

describe('Signup Component', () => {
    /*this test ensures that the signup process functions correctly by verifying 
    that the success message is displayed upon successful registration.*/
  test ('test for successful registration', async () => {
    
    // Render the Signup component
    render(<Router><Signup /></Router>);
    // Fill in the form fields
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('signup-button'));

    // Wait for the success message to appear
    await waitFor(() => {
        const successSnackbar = screen.getByTestId('success-snackbar');
        expect(successSnackbar).toBeInTheDocument();
        expect(successSnackbar).toHaveTextContent('Account creation successful! Returning to login');
    });

    });
    /*
    In this test, I'm simulating user input of an invalid email address and checking if the error 
    message for an invalid email is displayed correctly. This is important to verify that the component 
    handles invalid input and displays the appropriate error message to guide the user.
    */
    test('displays error for invalid email address', () => {
        const { getByRole, getByText, getByTestId } = render(<Router>
                                                    <Signup >
                                                    </Signup> 
                                                    </Router>);
        const emailInput = getByRole('textbox', { name: 'Email' });
        const signupButton = getByTestId('signup-button');
        // Simulate user input with an invalid email and submit the form
        fireEvent.change(emailInput, { target: { value: 'InvalidEmail' } });

        fireEvent.click(signupButton);
    
        // Assert that error message for invalid email is displayed
        expect(getByText('Invalid email address')).toBeInTheDocument();
    });
});