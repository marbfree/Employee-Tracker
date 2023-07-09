// import inquirer
const inquirer = require('inquirer');
// import file systems (do i need this or what is promises and what do?)
const fs = require('fs/promises');

// prompts for action on database
const questions = [
    {
        type: 'list', 
        name: 'View All',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add a Role', 'Add an Employee', 'Update An Employee Role']
    }
]

// initiates the prompts
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        // create table for answer
        // if(answers.list === "View All Departments") {
        //     viewDept();
        // }
        console.log(answers)
    })
}

init();