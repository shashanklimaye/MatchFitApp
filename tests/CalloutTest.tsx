import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RequestFormPage from './RequestFormPage';

test('renders RequestFormPage component', () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<RequestFormPage />);
  
  // Check if important elements are rendered
  expect(getByText('Create Request')).toBeTruthy();
  expect(getByText('Type of Intructor :')).toBeTruthy();
  expect(getByLabelText('Pilates')).toBeTruthy();
  expect(getByLabelText('Yoga')).toBeTruthy();
  expect(getByLabelText('Kick-Boxing')).toBeTruthy();
  expect(getByLabelText('Body-Combat')).toBeTruthy();
  expect(getByText('Enter Date:')).toBeTruthy();
  expect(getByPlaceholderText('Enter Location')).toBeTruthy();
  expect(getByPlaceholderText('Enter Pay Rate')).toBeTruthy();
  expect(getByPlaceholderText('Eg: class size 20, mic available')).toBeTruthy();
  expect(getByText('Submit')).toBeTruthy();
  expect(getByText('Cancel')).toBeTruthy();
});

test('displays error message on missing fields', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<RequestFormPage />);
  
  // Trigger form submission without filling in any fields
  fireEvent.press(getByText('Submit'));

  // Ensure that error messages are displayed for each required field
  await waitFor(() => {
    expect(getByText('Location is required.')).toBeTruthy();
    expect(getByText('Pay Rate is required.')).toBeTruthy();
    expect(getByText('Note is required.')).toBeTruthy();
  });
});

test('displays error message on invalid pay rate', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<RequestFormPage />);
  
  // Filling in the form with an invalid pay rate
  fireEvent.changeText(getByPlaceholderText('Enter Pay Rate'), 'abc');
  
  // Trigger form submission
  fireEvent.press(getByText('Submit'));

  // Ensure that error message is displayed for invalid pay rate
  await waitFor(() => {
    expect(getByText('Please enter a valid number.')).toBeTruthy();
  });
});

test('displays error message on invalid date', async () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<RequestFormPage />);
  
  // Selecting the date with invalid format
  fireEvent.changeText(getByPlaceholderText('Select a date'), 'invaliddate');
  
  // Trigger form submission
  fireEvent.press(getByText('Submit'));

  // Ensure that error message is displayed for invalid date
  await waitFor(() => {
    expect(getByText('Please enter a valid date.')).toBeTruthy();
  });
});

// Add more test cases as needed...
