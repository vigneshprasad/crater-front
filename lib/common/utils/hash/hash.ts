/**
 * Convers String to Integer
 *
 * @export
 * @param {String} string
 * @returns {Int} int
 */
export default function hashString(string: string): number {
  let hash = 0,
    i,
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
