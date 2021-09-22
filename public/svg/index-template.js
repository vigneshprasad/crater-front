/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    // return `export const ${exportName} = dynamic(() => import("./${basename}"));`;
    return `export { default as ${exportName} } from "./${basename}";`;
  });
  return exportEntries.join("\n");
}

module.exports = defaultIndexTemplate;
