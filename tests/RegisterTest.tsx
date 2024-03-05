import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import RegisterPage from './RegisterPage';

test('renders RegisterPage component', () => {
  const { getByLabelText, getByPlaceholderText, getByText } = render(<RegisterPage />);
  
  // Check if important elements are rendered
  expect(getByText('I am a:')).toBeTruthy();
  expect(getByPlaceholderText('First Name')).toBeTruthy();
  expect(getByPlaceholderText('Surname')).toBeTruthy();
  expect(getByPlaceholderText('Username')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getByText('Sign-in')).toBeTruthy();
});

test('displays error message on missing fields', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<RegisterPage />);
  
  // Trigger form submission without filling in any fields
  fireEvent.press(getByText('Next'));

  // Ensure that error messages are displayed for each required field
  await waitFor(() => {
    expect(getByText('First Name is required.')).toBeTruthy();
    expect(getByText('Username is required.')).toBeTruthy();
    expect(getByText('Password is required.')).toBeTruthy();
  });
});

test('displays error message on missing fields based on role', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<RegisterPage />);
  
  // Selecting the role as "Instructor"
  fireEvent.press(getByLabelText('Instructor'));

  // Trigger form submission without filling in any fields
  fireEvent.press(getByText('Next'));

  // Ensure that error messages are displayed for each required field
  await waitFor(() => {
    expect(getByText('First Name is required.')).toBeTruthy();
    expect(getByText('Surname is required.')).toBeTruthy();
    expect(getByText('Username is required.')).toBeTruthy();
    expect(getByText('Password is required.')).toBeTruthy();
  });
});

test('displays error message on invalid email', async () => {
  const { getByText,
