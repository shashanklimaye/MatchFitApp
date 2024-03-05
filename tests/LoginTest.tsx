// Import necessary testing libraries
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Page from './Page'; // Assuming the component file is named 'Page.js'

// Mock the useAuth hook
jest.mock('../../hooks/auth', () => ({
  useAuth: () => ({ login: jest.fn() })
}));

// Mock the router module
jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

// Mock the Image component
jest.mock('../../components/Image', () => 'Image');

// Mock the TextField component
jest.mock('../../components/TextField', () => 'TextField');

// Mock the View, Button, Text components
jest.mock('../../components', () => ({
  View: 'View',
  Button: 'Button',
  Text: 'Text'
}));

// Mock the ActivityIndicator component
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  ActivityIndicator: 'ActivityIndicator',
  Pressable: 'Pressable'
}));

// Mock AntDesign component
jest.mock('@expo/vector-icons', () => ({
  AntDesign: 'AntDesign'
}));

describe('Page component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Page />);

    // Check if important elements are present
    expect(getByText('Match Fit')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  test('form submission calls proceed function', async () => {
    const { getByText, getByPlaceholderText } = render(<Page />);

    // Mock user input
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    // Trigger form submission
    fireEvent.press(getByText('Arrow Right'));

    // Expect the proceed function to be called
    expect(login).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password123' });
  });

  test('clicking Join button navigates to registration page', () => {
    const { getByText } = render(<Page />);

    // Trigger button click
    fireEvent.press(getByText('Join'));

    // Expect the router to push to '/register'
    expect(router.push).toHaveBeenCalledWith('/register');
  });
});
