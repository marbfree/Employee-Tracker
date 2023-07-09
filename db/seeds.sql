INSERT INTO department (name)
VALUES ("Sales"),
       ("Teaching"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead", 40, 2),
       ("Instructor", 30, 2),
       ("Advisor", 15, 1),
       ("Manager", 50, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tasha", "Brown", 4),
       ("Tami", "Tan", 2, 3),
       ("John", "Doe", 1, 1),
       ("Rachel", "Cook", 3, 1);