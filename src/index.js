import readline from 'readline/promises';
import { homedir } from 'os';
import getUsername from './utils/getUsername.js';
import handleInput from './handlers/index.js';
import { logCurrentDir } from './utils/logCurrentDir.js';

const init = () => {
    const username = getUsername();
    console.info(`Welcome to the File Manager, ${username}!`);

    process.chdir(homedir());
    logCurrentDir();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', (input) => {
        const cleanInput = input.trim();
        cleanInput === '.exit' ? rl.close() : handleInput(cleanInput);
    });
    rl.on('close', () => {
        console.info(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit();
    });
};

init();
