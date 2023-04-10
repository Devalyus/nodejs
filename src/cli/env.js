const parseEnv = () => {
    // Write your code here
    let args = process.argv.slice(2);
    args = args.filter(item => item.startsWith('RSS_'));

    let string = '';
    args.forEach((arg, index) => {
        string += arg + `${(index + 1) === args.length ? '' : '; '}`;
    });
    console.log(string);
};


parseEnv();