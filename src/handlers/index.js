import { logCurrentDir } from '../utils/logCurrentDir.js';
import { up, cd, ls } from './navigate.js';
import { cat } from './operations.js';

const handleInput = async (command) => {
    console.log({ command });
    const commandArray = command.split(' ');
    const operation = commandArray[0];
    const args = commandArray.slice(1);
    try {
        switch (operation) {
            case 'up':
                up();
                break;
            case 'cd':
                cd(args.join(' '));
                break;
            case 'ls':
                await ls();
                break;
            case 'cat':
                await cat(args.join(' '));
                break;

            default:
                console.error('Invalid input');
                break;
        }
    } catch (error) {
        console.error('Operation failed');
    }

    logCurrentDir();
};

export default handleInput;
