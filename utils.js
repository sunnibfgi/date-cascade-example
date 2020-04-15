const fs = require('fs')
const shortName = function(str) {
  return str.substring(0, str.indexOf('.'))
}

exports.renderProps = function() {
  const result = fs.readFileSync(`${__dirname}/build/manifest.json`)
  let renderProps = {}
  let data, sn
  try {
    data = JSON.parse(result)
  } catch (err) {
    throw err
  }
  for (let file in data) {
    sn = shortName(file)
    renderProps[sn] = data[file]
  }
  return renderProps
}

exports.shortName = shortName
