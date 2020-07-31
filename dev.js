const { exec } = require("child_process");

exec("node bundle-server.js", (err, stdout, stderr) => {
    if (err) {
        console.log("Error: ", err.message);
        return;
    }
    if (stderr) {
        console.log("stderr: ", stderr);
        return;
    }
    console.log("stdout: ", stdout);
});
