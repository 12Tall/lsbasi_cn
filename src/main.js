const readline = require('readline'),
    { Garser } = require('./Parser');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdout.write("calc> ");
rl.on('line', str => {
    if (str !== 'exit') {
        let parser = Garser(str);
        console.log(`${parser}`);        
        process.stdout.write("calc> ");
    } else {
        rl.close()
    }
})

rl.on('close', () => {
    console.log('existing...');
    process.exit(0);
})