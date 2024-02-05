const getUsername = () => {
    const inputArguments = process.argv.slice(2);

    const usernameArray = inputArguments
        .map((arg) => arg.split('='))
        .filter((arg) => arg[0] === '--username');
    return usernameArray.length < 1 ? 'Anonymous_User' : usernameArray[0][1];
};

export default getUsername;
