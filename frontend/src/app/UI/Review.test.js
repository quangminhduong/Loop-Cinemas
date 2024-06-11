import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReviewDialog from './ReviewDialog';

describe('ReviewDialog', () => {
  /* The purpose of this test was to see if the characters counter work properly and check if it exclude the <html> attribute out or not
    since the review should now be allowed with that and if taking them into account, it will take up a lot of characters.
  */
  test('displays characters remaining', () => {
    const mockUserData = {
      id: 123,
      username: 'testuser',
    };
    localStorage.setItem('activeUser', JSON.stringify(mockUserData));
    const { getByTestId } = render(<ReviewDialog close={() => {}} movieId={123} />);

    // Get the message input element
    const messageInput = getByTestId('message-input');

    // Simulate typing into the message input
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });

    // Get the characters remaining element
    const charactersRemainingElement = getByTestId('characters-remain');

    // Check if the characters remaining value is displayed correctly
    expect(charactersRemainingElement.textContent).toBe('578 characters remaining'); // 600 - 22 (length of test message)

    // Simulate typing more characters into the message input
    fireEvent.change(messageInput, { target: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' } });

    // Check if the characters remaining value is updated correctly
    expect(charactersRemainingElement.textContent).toBe('544 characters remaining'); // 600 - 56 (length of longer test message)

    // Check if the counter does take <html> attribute for formatted text or not

    fireEvent.change(messageInput, { target: { value: '<h2><strong>Lorem ipsum dolor sit amet</strong></h2><p>, consectetur adipiscing elit.</p>' } });

    // Check if the characters remaining value is updated correctly
    expect(charactersRemainingElement.textContent).toBe('544 characters remaining'); // 600 - 56 (length of longer test message)
  });
});

