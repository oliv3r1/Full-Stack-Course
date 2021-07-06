const os = require('os');

//get platform
console.log(os.platform());

//get CPU architecture
console.log(os.arch());

//get CPU core info
console.log(os.cpus());

//amount of free memory (bytes)
console.log(os.freemem());

//amount of total memory (bytes)
console.log(os.totalmem());

//homedir
console.log(os.homedir());

//uptime (seconds)
console.log(os.uptime());
