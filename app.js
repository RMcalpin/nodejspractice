const express = require('express')
const cors = require('cors');
const archiver = require('archiver');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const AdmZip = require('adm-zip');
const { VM } = require('vm2');
const zipname = 'files.zip';
const app = express()
const port = 3000
const courses = require('./routes/courses')
const instructors = require('./routes/instructors')
const departments = require('./routes/departments')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'unzipped')));
app.use('/courses', courses)
app.use('/instructors', instructors)
app.use('/departments', departments)

// Ensure 'unzipped' directory exists
const unzipPath = path.join(__dirname, 'unzipped');
if (!fs.existsSync(unzipPath)) {
    fs.mkdirSync(unzipPath, { recursive: true });
}

// Function to create the zip file
function createZip(callback) {
    console.log("Creating zip file...");
    const output = fs.createWriteStream(zipname);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Zip file '${zipname}' created successfully.`);
        callback(); // Extract the zip after it's created
    });

    archive.on('error', (err) => {
        console.error("Error creating zip:", err.message);
    });

    archive.pipe(output);

    const filePaths = [
        { path: '../university/universityclient/src/dept-http-methods.js', name: 'dept-http-methods.js' },
        { path: '../university/universityclient/src/course-http-methods.js', name: 'course-http-methods.js' },
        { path: '../university/universityclient/src/index.html', name: 'index.html' },
        { path: '../university/universityclient/src/department.html', name: 'department.html' },
        { path: '../university/universityclient/src/course.html', name: 'course.html' }
    ];

    filePaths.forEach(file => {
        const fullPath = path.join(__dirname, file.path);
        if (fs.existsSync(fullPath)) {
            archive.file(fullPath, { name: file.name });
        } else {
            console.warn(`Warning: File not found: ${fullPath}`);
        }
    });

    archive.finalize();
}

// Function to extract the zip
function extractZip() {
    if (!fs.existsSync(zipname)) {
        console.error(`Error: Zip file '${zipname}' not found.`);
        return;
    }

    try {
        console.log("Extracting zip file...");
        const zip = new AdmZip(zipname);
        zip.extractAllTo(unzipPath, true);
        console.log("Extraction complete.");

        // Store extracted files in memory
        const files = {};
        zip.getEntries().forEach((entry) => {
            console.log(`Extracting: ${entry.entryName}`);
            files[entry.entryName] = zip.readAsText(entry);
        });

        // Serve extracted files dynamically
        app.get('/:filename', (req, res) => {
            const fileName = req.params.filename;
            if (files[fileName] && fileName.endsWith('.html')) {
                res.send(files[fileName]); // Send HTML content
            } else {
                res.status(404).send('File not found');
            }
        });

        // Execute extracted JavaScript files
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

    } catch (error) {
        console.error(`Error extracting zip file: ${error.message}`);
    }
}

// First, create the ZIP file, then extract it, then start the server
createZip(() => {
    extractZip();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});