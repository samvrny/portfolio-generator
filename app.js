const inquirer = require("inquirer");
const generatePage = require("./src/page-template.js");
const {writeFile, copyFile} = require("./utils/generate-site.js");

const promptUser = () => {
return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log("Please enter your name!");
                  return false;
                }
            }
        },
        {
            type: "input",
            name: "github", //may need to change to "github" EDIT: may need to change to Github Username later
            message: "Enter your Github Username",
            validate: githubInput => {
                if(githubInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({confirmAbout}) => {
                if(confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    //If there's no "projects" array, property, create one
    if(!portfolioData.projects) {
        portfolioData.projects = [];

    }
    console.log(`
===============================
Add a New Project
===============================    
    `);

    return inquirer.prompt([
        {
            type: "input",
            name: "name", //May need to be turned into project name
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: projectDesc => {
                if(projectDesc) {
                    return true;
                } else {
                    console.log("Please enter a description of your project!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the Github link to your project. (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter the link to your github project!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse, "CHICKEN");
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse, "WAFFLE");
  })
  .catch(err => {
    console.log(err);
  });



//FOR REFERENCE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//     // This...
//     for(let i = 0; i < profileDataArr.length; i++) {
//     console.log(profileDataArr[i]);
//     }


// console.log("====================");

// //Is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
//FOR REFERENCE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);
        
//         // fs.writeFile("./index.html", pageHTML, err => {
//         //     if(err) throw new Error(err);

//         //     console.log("Page created! Check out index.html in this directory to see it!");
//         // });
//     });