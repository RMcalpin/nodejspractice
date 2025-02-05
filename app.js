const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const AdmZip = require('adm-zip');
const { VM } = require('vm2');
const app = express()
const zip = new AdmZip('files.zip');
const port = 3000
const courses = require('./routes/courses')
const instructors = require('./routes/instructors')
const departments = require('./routes/departments')

zip.extractAllTo(path.join(__dirname, 'unzipped'), true);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'unzipped')));
app.use('/courses', courses)
app.use('/instructors', instructors)
app.use('/departments', departments)

const files = {};
zip.getEntries().forEach((entry) => {
    files[entry.entryName] = zip.readAsText(entry);
});

app.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  if (files[fileName] && fileName.endsWith('.html')) {
      res.send(files[fileName]); // Send HTML content
  } else {
      res.status(404).send('File not found');
  }
});

app.get('/run/:filename', (req, res) => {
  const fileName = req.params.filename;
  if (files[fileName] && fileName.endsWith('.js')) {
      console.log(`Executing ${fileName}...`);
      
      try {
          const vm = new VM({ timeout: 1000 }); // Safe execution
          const result = vm.run(files[fileName]); 
          res.send(`Executed: ${fileName}, Result: ${result}`);
      } catch (err) {
          res.status(500).send(`Error executing ${fileName}: ${err.message}`);
      }
  } else {
      res.status(404).send('File not found');
  }
});

const server = app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})