const csv = require('csv-parser');
const fs = require('fs');

let index = 0;
let objArray = [];
let obj = {};

fs.createReadStream('values.csv')
  .pipe(csv())
  .on('data', (row) => {

    if (row.value) {
        
        // console.log(index, row.value)
        
        if (index % 2 === 0) {
            obj['number'] = row.value
        } else {
            obj['letter'] = row.value;
            objArray.push(obj)

            obj = {}
        }

        ++index;
    }
  })
  .on('end', () => {
    console.log(objArray)
  })

function resolve() {

}