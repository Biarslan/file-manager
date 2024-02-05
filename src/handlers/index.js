import { logCurrentDir } from '../utils/logCurrentDir.js';
import { up, cd, ls } from './navigate.js';
import { add, cat, cp, remove, rn } from './operations.js';
import { handleOS } from './osHandler.js';

const handleInput = async (command) => {
    console.log({ command });
    const commandArray = command.split(' ');
    const operation = commandArray[0];
    const args = commandArray.slice(1).join(' ');
    try {
        switch (operation) {
            case 'up':
                up();
                break;
            case 'cd':
                cd(args);
                break;
            case 'ls':
                await ls();
                break;
            case 'cat':
                await cat(args);
                break;
            case 'add':
                await add(args);
                break;
            case 'rn':
                await rn(args);
                break;
            case 'cp':
                await cp(args);
                break;
            case 'rm':
                await remove(args);
                break;
            case 'os':
                await handleOS(args);
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
