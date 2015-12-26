var xlsx = require('node-xlsx');

class XlslParser {
    constructor(filePath) {
        console.log('-- starting to create excel file ---');
        this.data = xlsx.parse(__dirname + filePath); // parses a file 
        // var obj = xlsx.parse(fs.readFileSync(__dirname + '/myFile.xlsx')); // parses a buffer 
       // console.log('-- data: '+JSON.stringify(obj));
    }
    
    toString() {
        return JSON.stringify(this.data);
    }
}

export {XlslParser};