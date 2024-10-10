const { log } = require("winston"); // Import the winston logging library
const db = require("../config/db"); // Import the database connection

// This function gets the role of the user in the organization
exports.profileGetRole = async (req, res) => {
    console.log(req.user);
    try {
        // Query the database to get the role of the user in the organization
        const data = await db.query(
            `SELECT e.role_name as role
             FROM employees e
             WHERE e.user_id=$1 AND e.org_abbreviation=$2;`,
            [req.user.id, req.query.org] // Using user ID and organization abbreviation
        );

        // Send the role as a response
        res.status(200).json(data.rows[0]);
    } catch (error) {
        // If there is an error, send the error message as a response
        res.status(400).json({ error: error.message });
    }
};

// This function gets all organizations of the user
exports.profileGetOrg = async (req, res) => {
    console.log(req.user);
    try {
        // Query the database to get all organizations of the user
        const data = await db.query(
            `select e.id as id, o.abbreviation as abbreviation, o.name as name, o.address as address
            from employees e
            join organizations o ON e.org_abbreviation = o.abbreviation
            where e.user_id=$1;`,
            [req.user.id] // Using user ID
        );
        // Send the list of organizations as an array of rows
        res.status(200).json(data.rows);
    } catch (error) {
        // If there is an error, send the error message as a response
        res.status(400).json({ error: error.message });
    }
};