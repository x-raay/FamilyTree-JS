const FamilyTree = require('./src/FamilyTree');

const fs = require('fs');
const fileName = process.argv[2]; // filename

const data = fs.readFileSync(`${fileName}`,'utf-8');
let family = new FamilyTree('Shan', 'Anga');
family.readFromFile(data);