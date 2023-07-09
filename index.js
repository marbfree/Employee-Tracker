const inquirer = require('inquirer');
const fs = require('fs/promises');
// const prompts = require('prompts.js');


const questions = [
    {
        type: 'input', 
        name: 'text',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add a Role', 'Add an Employee', 'Update An Employee Role']
    }
]

function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        if(answers.action === "View All Departments") {
            viewDept();
        }
        console.log(answers)
    })
}

init();