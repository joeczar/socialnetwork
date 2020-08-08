const { exec, spawn } = require("child_process");

// exec("node bundle-server.js", (err, stdout, stderr) => {
//     if (err) {
//         console.log("Error: ", err.message);
//         return;
//     }
//     if (stderr) {
//         console.log("stderr: ", stderr);
//         return;
//     }
//     console.log("stdout: ", stdout);
// });

const startRedis = spawn("sudo service redis-server start");
const startPostgres = spawn("sudo service postgresql start");

// sudo service postgresql start && sudo service redis-server start
