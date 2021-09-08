function template({ template }, opts, { componentName, props, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ["typescript"] });

  componentName.name = componentName.name.slice(3);

  return typeScriptTpl.ast`
    export default function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element {
      return ${jsx};
    } 
  `;
}
module.exports = template;
