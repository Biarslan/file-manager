import { createReadStream } from 'fs';

export const cat = async (path) => {
    return new Promise((res, rej) => {
        const readStream = createReadStream(path, { encoding: 'utf8' });
        readStream.pipe(process.stdout);
        readStream.on('end', res);
        readStream.on('error', (err) => {
            rej(err);
        });
    });
};
