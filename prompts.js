function viewDept() {
    let query = 'SELECT name FROM department'
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
};

modeule.exports = prompts