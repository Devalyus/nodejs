const parseArgs = () => {
    // Write your code here 
    const args = process.argv.slice(2);
    let string = "";
    args.forEach((arg, index) => {
        if (arg.startsWith('--')) {
            string += `${arg.slice(2)} is ${args[index + 1]}${(index + 2) === args.length ? '' : ','} `;
        }
    });

    console.log(string);
};

parseArgs();