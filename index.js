const inquirer = require('inquirer');
const fs = require('fs/promises');

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
        console.log(answers)
    })
}

init();