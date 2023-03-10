const fs = require('fs')
const en = require('./static/lang/language')
const config = require('./static/lang/config/config.json')
const checkObj = (objBase, obj) => {
  const result = {}
  Object.keys(objBase).forEach((key) => {
    const baseValue = objBase[key]
    let value = obj[key]
    if (typeof baseValue === 'object') {
      if (typeof value === 'object') {
        result[key] = checkObj(baseValue, value)
      } else {
        result[key] = baseValue
      }
    } else {
      if (typeof value === 'object' || typeof value === 'undefined') {
        result[key] = baseValue
      } else {
        result[key] = value
      }
    }
  })
  return result
}

// generate sub language
;(async () => {
  const files = (config.languages || []).map((item) => `${item}.js`)
  files.forEach((file) => {
    let fileObj = {}
    if (fs.existsSync(`./static/lang/sub-language/${file}`)) {
      fileObj = require(`./static/lang/sub-language/${file}`)
    }
    const writeStream = fs.createWriteStream(`./static/lang/sub-language/${file}`)
    writeStream.write('module.exports = ' + JSON.stringify(checkObj(en, fileObj)))
    writeStream.end()
  })
})()

// const getKey = (obj) => {
//   const keys = []
//   Object.keys(obj).forEach((key) => {
//     if (typeof obj[key] === 'object') {
//       const subKey = [...getKey(obj[key])]
//       keys.push(...subKey.map((item) => `${key}.${item}`))
//     } else {
//       keys.push(key)
//     }
//   })
//   return keys
// }

const indexContent = (importText, allMessages) => `
// THIS FILE GENERATED, DO NOT EDIT !!
import en from '../language'
${importText}

const allMessages = ${allMessages}

export default allMessages
`

// generate index
;(async () => {
  const writeStream = fs.createWriteStream(`./static/lang/config/index.js`)
  writeStream.write(
    indexContent(config.languages.map((item) => `import ${item} from '../sub-language/${item}'`).join('\n'), `{ en, ${config.languages.join(', ')}}`)
  )
  writeStream.end()
})()
