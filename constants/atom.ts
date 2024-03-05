// atoms.js (or any file you prefer)
import { atom } from 'jotai';

export const latitude = atom('');
export const longitude = atom('');
export const streetAddress = atom('');
export const cpr = atom(false);
export const insurance = atom(false);
export const distance = atom(0);
