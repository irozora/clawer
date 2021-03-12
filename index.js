#!/usr/bin/env node
const program = require('commander');
const GetTopWebsites = require('./helper/parser');

// Basic setup for a node cli
program
    .version('0.0.1')
    .name('clawer')
    .description('Parse data from a selected website.')
    .option('-t, top', 'Input a number between 1 to 50.')
    .option('-c, country', 'A country name is required.')
    .parse(process.argv);


/**
 * exitProgram: a function to send error message and tips to the user, and then exit the process.
 * @param {string} errMessage - an error message presents to user.
 */
function exitProgram(errMessage) {
    errMessage = errMessage || 'Please input a valid action.';
    console.error(errMessage);
    program.outputHelp();
    process.exit(); 
}

/**
 * capitalizeFirstLetter: a function transform the user input. Capitalize only the first character and lower the rest of the characters.
 * @param {string} str - an string entered by the user.
 */
function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}


const action = process.argv[2] || program.args[0];
let errorMessage;

switch (action) {
    // show top <number> sites URL if the action is "top" or "-t"
    case "top":
    case "-t":
        let number = Number(process.argv[3] || program.args[1]);
        if (typeof number !== "number" || isNaN(number)) {
            errorMessage = 'Invalid argument.';
            exitProgram(errorMessage);
        } else if (number <= 0 || number > 50) {
            errorMessage = 'Only accepts number from 1 to 50.';
            exitProgram(errorMessage);
        } else {
            GetTopWebsites.certainAmount(number);
        }
        break;

    // show top 20 sites URL by country if the action is "country" or "-c"
    case "country":
    case "-c":
        let country = process.argv[3] || program.args[1];
        if (!country) {
            errorMessage = 'Argument required.';
            exitProgram(errorMessage);
        } else {
            country = capitalizeFirstLetter(country);
            GetTopWebsites.topWebsitesByCountry(country);
        }
        break;    

    default:
        exitProgram();
        break;
}