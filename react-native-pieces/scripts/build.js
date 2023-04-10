const {
    createDirectoryIfNotExists,
    deleteDirectoryRecursive,
    readJSONFile,
    getCurrentFolderPath,
    writeJSONFile,
    incrementVersion,
    copyFolderRecursive,
    runCommand
} = require('./util');

const main = async () => {
    /* --------------------------------------- FOLDER DEFINITIONS */
    const projectName = 'react-native-pieces';
    const buildPath = `${getCurrentFolderPath()}/../../.build`;
    const buildProjectPath = `${buildPath}/${projectName}`;
    const projectPath = `${getCurrentFolderPath()}/..`;


    /* --------------------------------------- DELETE & CREATE BUILD FOLDER */
    deleteDirectoryRecursive(buildPath);
    createDirectoryIfNotExists(buildPath);
    createDirectoryIfNotExists(buildProjectPath);

    /* --------------------------------------- UPDATE PACKAGE.JSON FOR BUILD */
    const packageJsonBuild = readJSONFile(projectPath + '/package.json');
    packageJsonBuild.main = 'src/index.js';
    const dependencies = packageJsonBuild.dependencies;
    Object.keys(dependencies)
        .filter(x => x.includes('expo'))
        .forEach(x => {
            delete dependencies[x];
        });
    packageJsonBuild.dependencies = dependencies;
    delete packageJsonBuild.scripts;
    delete packageJsonBuild.private;
    writeJSONFile(buildProjectPath + '/package.json', packageJsonBuild);

    /* --------------------------------------- UPDATE PACKAGE.JSON FOR NEW VERSION */
    const packageJson = readJSONFile(projectPath + '/package.json');
    packageJson.version = incrementVersion(packageJson.version);
    writeJSONFile(projectPath + '/package.json', packageJson);


    /* --------------------------------------- BUILD & COPY */
    await runCommand('npm run build');
    copyFolderRecursive(projectPath + '/dist/src', buildProjectPath + '/src');
};

main();
