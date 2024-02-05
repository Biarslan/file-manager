import os from 'os';
export const handleOS = async (args) => {
    const cleanArgs = args.trim();

    switch (cleanArgs) {
        case '--EOL':
            console.info(JSON.stringify(os.EOL));
            break;
        case '--cpus':
            console.table(
                os.cpus().map(({ model, speed }) => {
                    return { model, speed: `${speed / 1000}GHz` };
                }),
            );
            break;
        case '--homedir':
            console.info(os.homedir());
            break;
        case '--username':
            console.info(os.userInfo().username);
            break;
        case '--architecture':
            console.info(os.arch());
            break;
        default:
            console.error('Invalid input');
            break;
    }
};
