const fs = require('fs');
const path = require('path');

module.exports = {
    products : JSON.parse(fs.readFileSync(path.join(__dirname, 'lentes.json'), 'utf-8'))
}