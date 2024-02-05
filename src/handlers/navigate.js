import { chdir, cwd } from 'process';
import { readdir } from 'fs/promises';
import { resolve } from 'path';

export const up = () => {
    chdir('..');
};

export const cd = (path) => {
    chdir(path);
};

export const ls = async () => {
    const currentDirectoryPath = resolve(cwd());
    const content = await readdir(currentDirectoryPath, {
        withFileTypes: true,
    });
    const table = content.map((entity) => {
        return {
            Name: entity.name,
            Type: entity.isFile() ? 'file' : 'directory',
        };
    });
    const sortedTable = table.sort((file1, file2) => {
        if (file1.Type === 'directory' && file2.Type !== 'directory') {
            return -1;
        } else if (file1.Type !== 'directory' && file2.Type === 'directory') {
            return 1;
        } else {
            return file1.Name.localeCompare(file2.Name);
        }
    });
    console.table(sortedTable);
};
