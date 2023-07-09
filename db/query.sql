-- shows department table after prompted
SELECT * FROM department
-- shows role table after prompted
SELECT * FROM role
-- shows combined department, employees, and role tables after prompted
SELECT * FROM employees JOIN role ON employees.role_id = role.id JOIN department ON
department.id = role.department_id;

-- how to add department?  Prompts: enter name of the department
-- how to add a role? Prompts: enter name, salary, and department
-- how to add an employee? Prompts: first name, last name, role, manager
-- how to update an employee role? prompts: select an employee and new role


