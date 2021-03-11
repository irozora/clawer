#!/usr/bin/env node
const program = require('commander');

program
    .version('0.0.1')
    .name('clawer')
    .description('Parse data from a selected website.')
    .option('-t, top', 'Input a number between 1 to 50.')
    .option('-c, country', 'A country name is required.')
    .parse(process.argv);

function exitProgram(errMessage) {
    // Output directions and exit the program.
    errMessage = errMessage || 'Please input a valid action.';
    console.error(errMessage);
    program.outputHelp();
    process.exit(); 
}

const action = program.args[0];
let errorMessage;

switch (action) {
    case "top":
    case "-t":
        let number = Number(program.args[1]);
        if (typeof number !== "number" || isNaN(number)) {
            errorMessage = 'Invalid argument.';
            exitProgram(errorMessage);
        } else if (number <= 0 || number > 50) {
            errorMessage = 'Only accepts number from 1 to 50.';
            exitProgram(errorMessage);
        } else {
            console.log(`current action is ${action}, and number is ${number}`);
        }
        break;
    case "country":
    case "-c":
        console.log(`current action is ${action}`);
        break;    
    default:
        exitProgram();
        break;
}