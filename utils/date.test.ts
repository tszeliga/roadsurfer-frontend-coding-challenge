import { formatDate } from './date';
import { describe, it, expect } from 'vitest';

describe('formatDate function', () => {
    it('formats a Date object with default format', () => {
    const date = new Date('2023-01-15');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('15-01-2023');
  });
});