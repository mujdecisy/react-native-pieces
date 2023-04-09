const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2, 10);
if (args.length < 2) {
	throw Error('At least 2 arguments have to be passed.');
}
const command = args[0];


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

const formatString = str => str
	.replace(
		/-([a-z])/g,
		g => g[1].toUpperCase()
	).replace(
		/^([a-z])/g,
		g => g.toUpperCase()
	);

function createFileWithContent(filePath, content) {
	fs.writeFile(filePath, content, function (err) {
		if (err) {
			throw err;
		}
	});
}


const commands = {
	'component': () => {
		const componentName = formatString(args[1]);
		const componentPath = getCurrentFolderPath() + `/../src/components/${componentName}`;
		createDirectoryIfNotExists(componentPath);
		
		const content = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TakozProps {
}

const Takoz = (props: TakozProps) => {
	return (
		<View>
			<Text>Takoz</Text>
		</View>
	);
};

const styles = StyleSheet.create({

});

export default Takoz;
`.replaceAll('Takoz', componentName);
		createFileWithContent(componentPath+'/index.tsx', content);
	}

};

commands[command]();



