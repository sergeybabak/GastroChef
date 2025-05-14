function pxToRemPlugin(options = { base: 16 }) {
  return {
    postcssPlugin: 'px-to-rem',
    Declaration(decl) {
      if (decl.value.includes('px')) {
        decl.value = decl.value.replace(/(\d*\.?\d+)px/g, (_, px) => {
          const rem = parseFloat(px) / options.base;
          return `${rem}rem`;
        });
      }
    }
  };
}

pxToRemPlugin.postcss = true;
export default pxToRemPlugin;