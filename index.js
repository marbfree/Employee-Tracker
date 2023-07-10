// import inquirer
const inquirer = require('inquirer');
// import file systems (do i need this or what is promises and what do?)
const mysql = require('mysql2');


// prompts for action on database
const questions = [
    {
        type: 'list',
        name: 'Select',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add a Role', 'Add an Employee', 'Update An Employee Role']
    }
]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

// initiates the prompts then shows table for each prompt
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            // create table for answer
            if (answers.Select === "View All Departments") {
                viewDept();
                return;
            }
            if (answers.Select === "View All Roles") {
                viewRoles();
                return;
            }
            if (answers.Select === "View All Employees") {
                viewEmployee();
                return;
            }
            if (answers.Select === "Add A Department") {
                addDept();
                return;
            }
            if (answers.Select === "Add a Role") {
                addRole();
                return;
            }
        })
}


function viewDept() {
    let query = "SELECT * FROM department"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewRoles() {
    let query = "SELECT * FROM role"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewEmployee() {
    let query = "SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the new department.'
        }
    ])
        .then((answers) => {
            let query = `INSERT INTO department (name)
        VALUES ("${answers.department}")`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log('Success!');
                init();
            })
        })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message:"Enter the title of the new role."
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter the salary for the new role."
        },
        {
            type: 'input',
            name: 'department_id',
            message: "Enter the department id."
        }
    ])
        .then((answers) => {
            let query = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.department_id})`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log('Success!');
                init();
    })});
}
init();

// when "view all departments" is selected, the function "viewDept" creates table