
const fs = require('fs')

const FileRead = async name => fs.readFileSync(name, 'utf8');
const WriteFile = name => data => fs.writeFileSync(name, data)

// Export
module.exports = {FileRead, WriteFile}