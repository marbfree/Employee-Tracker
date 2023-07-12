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
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Delete A Department', 'Delete A Role', 'Delete An Employee']
    }
]

// creates a connection to database
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
            if (answers.Select === "Add A Role") {
                addRole();
                return;
            }
            if (answers.Select === "Add An Employee") {
                addEmployee();
                return;
            }
            if (answers.Select === "Update An Employee Role") {
                updateRole();
                return;
            } 
            if (answers.Select === "Delete A Department") {
                deleteDept();
                return;
            }
            if (answers.Select === "Delete A Role") {
                deleteRole();
                return;
            }
            if (answers.Select === "Delete An Employee") {
                deleteEmployee();
                return;
            }
        })
}

// View the Department Table
function viewDept() {
    let query = "SELECT department.id, department.name AS department FROM department"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

// View the Role Table
function viewRoles() {
    let query = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON department_id = department.id"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

// View the Employees with department and role included
function viewEmployee() {
    let query = "SELECT employee.id, employee.first_name AS first, employee.last_name AS last, employee.manager_id AS manager, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

// Adds a new department
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

// Adds a new role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Enter the title of the new role."
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
            })
        })
}

// To add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the first name of the new employee."
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the last name of the new employee."
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the role id of the new employee."
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter the manager id of the new employee."
        }
    ])
        .then((answers) => {
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role_id}, ${answers.manager_id})`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log('Success!');
                init();
            })
        })
}

// Update an existing role 
function updateRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: "Enter the employee id to update their role."
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the Employee's new Role Id."
        }
    ])
        .then((answers) => {
            let query = `UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id}`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log('Success!');
                init();
            })
        })
}

// deletes a department by id
function deleteDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteDept',
            message: "Enter a department id to delete."
        }
    ])
        .then((answers) => {
            let query = `DELETE FROM department WHERE id = ${answers.deleteDept}`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log('Success!');
                init();
            })
        })
}

// deletes a role by id
function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteRole',
            message: "Enter a role id to delete."
        }
    ])
    .then((answers) => {
        let query = `DELETE FROM role WHERE id = ${answers.deleteRole}`
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log('Success!');
            init();
        })
    })
}

// deletes an employee by id
function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteEmployee',
            message: "Enter the employee id to delete."
        }
    ])
    .then((answers) => {
        let query = `DELETE FROM employee WHERE id = ${answers.deleteEmployee}`
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log('Success!');
            init();
        })
    })
}

init();

