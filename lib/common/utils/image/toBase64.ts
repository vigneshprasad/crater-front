/**
 * Convers Image File to Base64 string
 *
 * @export
 * @param {File} file
 * @returns {Promise<FileReader["result"]>}
 */
export default function toBase64(file: File): Promise<FileReader["result"]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
