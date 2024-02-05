import { createReadStream, createWriteStream } from 'fs';
import { open, rename, rm } from 'fs/promises';
import path from 'path';
import { cwd } from 'process';

export const cat = async (filePath) => {
    return new Promise((res, rej) => {
        const readStream = createReadStream(filePath, { encoding: 'utf8' });
        readStream.pipe(process.stdout);
        readStream.on('end', res);
        readStream.on('error', (err) => {
            rej(err);
        });
    });
};

export const add = async (filename) => {
    const filePath = path.join(cwd(), filename);
    let filehandle;
    try {
        filehandle = await open(filePath, 'wx');
    } finally {
        await filehandle?.close();
    }
};

export const rn = async (args) => {
    const oldPath = path.resolve(args.split(' ')[0]);
    const newPath = path.join(path.dirname(oldPath), args.split(' ')[1]);
    await rename(oldPath, newPath);
};

export const cp = async (args) => {
    return new Promise((res, rej) => {
        const pathToFile = path.resolve(args.split(' ')[0]);
        const newPathToDirectory = path.resolve(args.split(' ')[1]);
        const pathToNewFile = path.join(
            newPathToDirectory,
            path.parse(pathToFile).base,
        );
        const readStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToNewFile);
        readStream.pipe(writeStream);
        readStream.on('end', res);
        readStream.on('error', (err) => {
            rej(err);
        });
    });
};

export const remove = async (args) => {
    const filePath = path.resolve(args);
    await rm(filePath);
};
