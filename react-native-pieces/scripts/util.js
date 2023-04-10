const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

async function runCommand(command) {
  const execPromise = promisify(exec);
  const { stdout, stderr } = await execPromise(command);
  if (stderr) {
    console.error(`Command error: ${stderr}`);
    return;
  }
  console.log(stdout.trim());
}


function createDirectoryIfNotExists(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    } else {
        throw new Error('File already exists.');
    }
}

function getCurrentFolderPath() {
    return path.dirname(process.mainModule.filename);
}

function createFileWithContent(filePath, content) {
    fs.writeFile(filePath, content, function (err) {
        if (err) {
            throw err;
        }
    });
}

function deleteDirectoryRecursive(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteDirectoryRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        // delete directory
        fs.rmdirSync(dirPath);
    }
}


function readJSONFile(filePath) {
    const data = fs.readFileSync(filePath);
    const json = JSON.parse(data);
    return json;
}

function writeJSONFile(filePath, data) {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, json);
}

function incrementVersion(versionString) {
    const versionArray = versionString.split('.');
    versionArray[2] = parseInt(versionArray[2], 10) + 1;
    const newVersionString = versionArray.join('.');
    return newVersionString;
}


function copyFolderRecursive(sourcePath, targetPath) {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }

    const files = fs.readdirSync(sourcePath);

    files.forEach((file) => {
        const sourceFilePath = path.join(sourcePath, file);
        const targetFilePath = path.join(targetPath, file);

        if (fs.lstatSync(sourceFilePath).isDirectory()) {
            copyFolderRecursive(sourceFilePath, targetFilePath);
        } else {
            fs.copyFileSync(sourceFilePath, targetFilePath);
        }
    });
}

module.exports = {
    createDirectoryIfNotExists,
    getCurrentFolderPath,
    createFileWithContent,
    deleteDirectoryRecursive,
    readJSONFile,
    writeJSONFile,
    incrementVersion,
    copyFolderRecursive,
    runCommand
}

