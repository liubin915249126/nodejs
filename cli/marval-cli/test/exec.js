const { exec, execFile } = require('child_process');
exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});


const child = execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(111,stdout);
});