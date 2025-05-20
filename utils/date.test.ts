import { formatDate, newDate, duration } from './date';
import { describe, it, expect } from 'vitest';

describe('formatDate function', () => {
    it('formats a Date object with default format', () => {
    const date = new Date('2023-01-15');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('15-01-2023');
  });
});

describe('duration function', () => {
  it('should return the correct difference in days', () => {
    const start = newDate('2025-05-01');
    const end = newDate('2025-05-05');
    const result = duration(start, end, 'day');
    expect(result).toBe(4);
});
})