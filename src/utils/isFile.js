import { stat } from 'fs/promises';
import { resolve } from 'path';

export const isFile = async (path) => {
    try {
        const stats = await stat(resolve(path));
        return stats.isFile();
    } catch (error) {
        return false;
    }
};
