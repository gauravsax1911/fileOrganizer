
// Entry point of my command line

let helpFunc = require("./commands/help");
let organizeFunc = require("./commands/organize");
let treeFunc = require('./commands/tree');

let input = process.argv.slice(2);


let command = input[0];

switch(command)
{
    case "tree":
        var sourcePath = input[1];
        treeFunc.treeHelper(sourcePath);
        break;

    case "organize":
        var sourcePath = input[1];
        organizeFunc.organize(sourcePath);
        break;

    case "help":
        helpFunc.commandHelp();
        break;
    default:
        console.log("Please enter a valid command. Command not recognized.");
        break;

}