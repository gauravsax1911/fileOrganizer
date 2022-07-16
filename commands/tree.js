

const fs = require("fs");
const path = require("path");

// source path -> C:/Users/Downloads

// Contents of download folder
     // {archive -> abc.zip , m1.zar}
     // {doc -> f1.txt , abc.pdf , t2.txt}
     // {images -> f2.txt , u3.abc}

 // -> abc.zip
 // -> m1.zar
 // -> f1.txt
 // -> abc.pdf
 // -> t2.txt
 // -> f2.txt
 // -> u3.abc

     
function tree(sourcePath)
{
    // getting the folder name from the baseName function
    let folderName = path.basename(sourcePath);
    console.log(folderName);

    let allFilesFolder = fs.readdirSync(sourcePath);

    for(let i = 0; i < allFilesFolder.length; i++)
    {
        let allFilePath = path.join(sourcePath,allFilesFolder[i]);
        
        // To check whether its a file or a folder
        
        let isFile = fs.lstatSync(allFilePath).isFile();

        if(isFile)
        {
           // If its a file we console the folder name and file name 
            console.log(folderName + "--->" + allFilesFolder[i] + "\r\n");
        }

        else 
        {
            // if its a folder we call the same function recursively
            tree(allFilePath);
        }
    }
}

module.exports = {
    treeHelper:tree
}