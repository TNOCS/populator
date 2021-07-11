import { isPosition } from './isPosition.typeguard';

describe('Is Position typeguard', () => {
  const validPositionLatLong = [51.81155, 4.66636];
  const validPositionLatLongAltitude = [51.81155, 4.66636, 54.3148];
  const invalidPositionOneNumber = [51.81155];
  const invalidPositionWithString = ['invalid', 'position', 51.81155];
  const invalidPositionArray = 'position';

  it('should return true for valid lat long', async () => {
    expect(await isPosition(validPositionLatLong)).toBe(true);
  });

  it('should return true for valid lat long with altitude', async () => {
    expect(await isPosition(validPositionLatLongAltitude)).toBe(true);
  });

  it('should return false for an array with 1 number', async () => {
    expect(await isPosition(invalidPositionOneNumber)).toBe(false);
  });

  it('should return false for an array containing a non number', async () => {
    expect(await isPosition(invalidPositionWithString)).toBe(false);
  });

  it('should return false for a position that is not an array', async () => {
    expect(await isPosition(invalidPositionArray)).toBe(false);
  });
});
