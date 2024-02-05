import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

export const calculateHash = async (args) => {
    const filePath = path.resolve(args);

    const fileHash = await new Promise((resolve, reject) => {
        const hash = crypto.createHash('SHA256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => {
            const hexHash = hash.digest('hex');
            resolve(hexHash);
        });
        stream.on('error', (error) => reject(error));
    });

    console.info(fileHash);
};
