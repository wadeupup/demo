// const parser = require('@babel/parser')
// const traverse = require('@babel/traverse').default
// const generator = require('@babel/generator').default
// const t = require('@babel/types')
// module.exports = function (source) {
//   // const ast = parser.parse(source, { sourceType: 'module' })
//   // traverse(ast, {
//   //   CallExpression(path) {
//   //     if (t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, { name: 'console' })) {
//   //       path.remove()
//   //     }
//   //   }
//   // })
//   // const output = generator(ast, {}, source)
//   console.log(source, '==========source')
//   return source
// }
var utils = require('loader-utils')

module.exports = function (source) {
  const options = utils.getOptions(this)

  source = source.replace(/\[name\]/g, options.name)
  console.log(`export default ${JSON.stringify({
    content: source,
    filename: this.resourcePath
  })}`)
  return `export default ${JSON.stringify({
    content: source,
    filename: this.resourcePath
  })}`
  // return source
}
