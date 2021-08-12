function template({ template }, opts, { componentName, props, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ["typescript"] });

  componentName.name = componentName.name.slice(3);

  const formattedName = `${componentName.name}: React.FC<Props>`;

  return typeScriptTpl.ast`
  type Props = React.SVGProps<SVGSVGElement>;
  const ${formattedName} = (${props}) => ${jsx};
  export default ${componentName}
`;
}
module.exports = template;
