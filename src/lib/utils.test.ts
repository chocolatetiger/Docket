import { describe, it, expect } from 'vitest';
import { formatDate, capitalise } from './utils';

describe('formatDate', () => {
  it('formats a January date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
  });

  it('formats a December date correctly', () => {
    expect(formatDate('2024-12-31')).toBe('Dec 31, 2024');
  });
});

describe('capitalise', () => {
  it('Capitalises the first character of the string', () => {
    expect(capitalise('capitalise')).toBe('Capitalise');
    expect(capitalise('Docket')).toBe('Docket');
  });

  it('formats an empty string to empty string', () => {
    expect(capitalise('')).toBe('');
  });
  it('capitalises a single character', () => {
    expect(capitalise('a')).toBe('A');
  });
});
