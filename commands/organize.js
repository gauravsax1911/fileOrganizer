
const fs  = require("fs");

const path = require("path");

let types = {media: ["mp4", "mkv", "mp3"],archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],app: ['exe', 'dmg', 'pkg', "deb"],images: ['png','jpg','jpeg']};

function organize(sourcePath)
{
    if(sourcePath == undefined)
    {
        sourcePath = process.cwd();
    }

    console.log(sourcePath);

    let organizedFiles = path.join(sourcePath,"organize_files");
    if(!fs.existsSync(organizedFiles))
    {fs.mkdirSync(organizedFiles);}
    else{console.log("Folder already exists!!");}

    // Once we have the sourcePath in which we want to organize the file we just need to classify the files
    // according to their extensions

    let allFiles = fs.readdirSync(sourcePath);

    // console.log(allFiles);

    //    [ 'matlab.zip',
//   'music.mp3',
//   'myimg.jpg',
//   'myresumt.pdf',
//   'organize_files',
//   'video.mp4'
// ]

 // Output of the console.

 // Now we need to get the extensions of the files
 // There are two ways to go about it 
 // 1 -> To use the the function in path module -> path.extname 
 // 2 -> Or split the allFiles[i] on the basis of "." and get allFiles[i].split(".")[1]( abc.zip ->  ['abc' , 'zip'])

   for(let i = 0 ; i < allFiles.length; i++)
   {
      let fullFilePath = path.join(sourcePath,allFiles[i]);

      let isFile = fs.lstatSync(fullFilePath).isFile();

      if(isFile)
      {
          let extName = path.extname(allFiles[i]).split(".")[1];
         
          let folderName = getFolderName(extName);

          copyFileToDestination(sourcePath,fullFilePath,folderName);
      }
      
   }

}

function getFolderName(extName)
{
    for(let keys in types)
    {
        for(let i = 0 ; i < types[keys].length ; i++)
        {
            if(types[keys][i] ==  extName)
            {
                return keys;
            }
        }
    }

    return "misllaneous";
}

function copyFileToDestination(sourcePath , fullFilePath , folderName)
{
    let folderPath = path.join(sourcePath,"organize_files",folderName);

    if(!fs.existsSync(folderPath))
    {fs.mkdirSync(folderPath);}

    let fileName = path.basename(fullFilePath);
    let destFileName = path.join(folderPath,fileName);

    fs.copyFileSync(fullFilePath,destFileName);
}

module.exports = {
    organize : organize
}