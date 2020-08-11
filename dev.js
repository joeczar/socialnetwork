const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function startPostgresAndRedis() {
    const { stdout, stderr } = await exec("sh", [
        "-c",
        "sudo service postgresql start && sudo service redis-server start",
    ]);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
}
module.exports = { startPostgresAndRedis };
// sudo service postgresql start && sudo service redis-server start
