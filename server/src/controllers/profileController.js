const { log } = require("winston");
const db = require("../config/db");

exports.profileGetRole = async (req, res) => {
    console.log(req.user);
    try {
        const data = await db.query(
            `SELECT e.role_name as role
             FROM employees e
             WHERE e.user_id=$1 AND e.org_abbreviation=$2;`,
            [req.user.id, req.query.org]
        );
        res.status(200).json(data.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.profileGetOrg = async (req, res) => {
    console.log(req.user);
    try {
        const data = await db.query(
            `select e.id as id, o.abbreviation as abbreviation, o.name as name, o.address as address
            from employees e
            join organizations o ON e.org_abbreviation = o.abbreviation
            where e.user_id=$1;`,
            [req.user.id]
        );
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};