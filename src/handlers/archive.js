import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

export const compress = async (args) => {
    const inputFilePath = path.resolve(args.split(' ')[0]);
    const newPathToDirectory = path.resolve(args.split(' ')[1]);
    const newFileName = path.parse(inputFilePath).base + '.br';
    const outputFilePath = path.join(newPathToDirectory, newFileName);

    const rreadStream = createReadStream(inputFilePath);
    const writeStream = createWriteStream(outputFilePath);
    const brotliCompress = createBrotliCompress();

    await pipeline(rreadStream, brotliCompress, writeStream);
};

export const decompress = async (args) => {
    const inputFilePath = path.resolve(args.split(' ')[0]);
    const newPathToDirectory = path.resolve(args.split(' ')[1]);
    const fileName = path.parse(inputFilePath).base;
    const newFileName =
        fileName.endsWith('.br') && fileName.length > 3
            ? fileName.slice(0, -3)
            : fileName;
    const outputFilePath = path.join(newPathToDirectory, newFileName);

    const rreadStream = createReadStream(inputFilePath);
    const writeStream = createWriteStream(outputFilePath);
    const brotliDecompress = createBrotliDecompress();

    await pipeline(rreadStream, brotliDecompress, writeStream);
};
