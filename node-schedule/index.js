const schedule = require("node-schedule");
const {postEmail} = require('../googleplay/email');

const rule    = new schedule.RecurrenceRule();
rule.hour =18;
rule.minute =46;
rule.second =0;

schedule.scheduleJob(rule, function(){  
    postEmail([{name:'111'}])
});