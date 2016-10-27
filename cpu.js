var os = require("os");

//create function to get CPU information
function cpuAverage() {

    //initialise sum of idle and time of cores and fetch cpu info
    var totalIdle = 0;
    var totalTick = 0;
    var cpus = os.cpus();

    //loop through cpu cores
    for (var i = 0, len = cpus.length; i < len; i++) {

        //select CPU core
        var cpu = cpus[i];

        //total up the time in the cores tick
        for (type in cpu.times) {
            totalTick += cpu.times[type];
        }

        //total up the idle time of the core
        totalIdle += cpu.times.idle;
    }

    //return the average idle and tick times
    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

//start measure
var startMeasure = cpuAverage();

//set delay for second measure
setTimeout(function() {

    var endMeasure = cpuAverage();

    //calc difference in idle and total time between the measures
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    //calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    console.log(percentageCPU + "% CPU Usage.");

}, 1000);
