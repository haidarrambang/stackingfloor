const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const natural = require('natural');

const csvWriter = createCsvWriter({
  path: 'planning.csv',
  header: [
      {id: 'Employee ID', title: 'Employee ID'},
      {id: 'Employee Name', title: 'Employee Name'},
      {id: 'Department', title: 'Department'},
      {id: 'Division', title: 'Division'},
      {id: 'Directorate', title: 'Directorate'},
      {id: 'Location', title: 'Location'},
  ]
});
// Fungsi untuk memeriksa apakah kata kunci ada di dalam string
function containsKeyword(sentence, keyword) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(sentence.toLowerCase());
  return words.includes(keyword.toLowerCase());
 }

// Array untuk menyimpan baris-baris yang difilter
let filteredRows = [];
// let filteredSecond = [];

// Membaca file CSV dan menyaring data
fs.createReadStream('emp_floor_data.csv')
  .pipe(csv())
  .on('data', row => {
    // Misalnya, kita ingin menyaring baris berdasarkan kolom 'Color', 'Year' dan 'Price' 
    const location = row.Location || '';

    if (
        containsKeyword(location, 'Jkt') ||   containsKeyword(location, 'XLATower')
    ) { 
      filteredRows.push(row);
    }
    
  })
  .on('end', () => {
    console.log('Proses penyaringan selesai.');
    // console.log('Array yang pertama: ', filteredRows);
    // console.log('Array yang kedua: ', filteredSecond);

    
    csvWriter.writeRecords(filteredRows)
      .then(() => console.log('Data telah dituliskan ke file CSV!'))
      .catch((err) => console.error(err));
  });

  