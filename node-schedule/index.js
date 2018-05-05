const schedule = require("node-schedule");
const {postEmail} = require('../googleplay/email');

const rule    = new schedule.RecurrenceRule();
rule.hour =18;
rule.minute =10;
rule.second =0;

schedule.scheduleJob(rule, function(){  
    postEmail([{name:'111'}])
});