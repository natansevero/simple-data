const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'number', title: 'number'},
    {id: 'a', title: 'a'},
    {id: 'b', title: 'b'},
    {id: 'c', title: 'c'},
    {id: 'd', title: 'd'},
    {id: 'e', title: 'e'},
    {id: 'f', title: 'f'},
    {id: 'g', title: 'g'},
    {id: 'h', title: 'h'},
    {id: 'i', title: 'i'},
    {id: 'j', title: 'j'},
  ]
});

let index = 0;
let objArray = [];
let obj = {};

fs.createReadStream('values.csv')
  .pipe(csv())
  .on('data', (row) => {

    if (row.value) {    
        if (index % 2 === 0) {
            obj['number'] = parseInt(row.value)
        } else {
            obj['element'] = row.value.toLowerCase();
            objArray.push(obj)

            obj = {}
        }

        ++index;
    }
  })
  .on('end', () => {
    resolve(objArray)
  })

function resolve(dataArray) {
    let matriz = [];
    
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    for (let i = 0; i <= 198; i++) {
        let obj = {
            number: '',
            a: '0',
            b: '0',
            c: '0',
            d: '0',
            e: '0',
            f: '0',
            g: '0',
            h: '0',
            i: '0',
            j: '0'
        }

        obj.number = i;

        for (let j = 0; j < dataArray.length; j++) {
            if (dataArray[j].number === i && letters.includes(dataArray[j].element)) {
                obj[dataArray[j].element] = '1'
            }
        }

        matriz.push(obj)
    }

    csvWriter
        .writeRecords(matriz)
        .then(()=> console.log('The CSV file was written successfully'));
 }