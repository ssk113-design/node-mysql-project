const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ChatBotTests'
});

app.get('/getAllItems', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Items');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.json(null);
    }
});

app.post('/addItem', async (req, res) => {
    const { name, desc } = req.query;

    if (!name || !desc) {
        return res.json(null);
    }

    try {
        const [result] = await pool.query('INSERT INTO Items (name, `desc`) VALUES (?, ?)', [name, desc]);
        res.json({ id: result.insertId, name, desc });
    } catch (err) {
        console.error(err);
        res.json(null);
    }
});

app.post('/deleteItem', async (req, res) => {
    const { id } = req.query;

    if (!id || isNaN(id)) {
        return res.json(null);
    }

    try {
        const [check] = await pool.query('SELECT * FROM Items WHERE id = ?', [id]);
        if (check.length === 0) {
            return res.json({});
        }

        await pool.query('DELETE FROM Items WHERE id = ?', [id]);
        res.json(check[0]); 
    } catch (err) {
        console.error(err);
        res.json(null);
    }
});

app.post('/updateItem', async (req, res) => {
    const { id, name, desc } = req.query;

    if (!id || isNaN(id) || !name || !desc) {
        return res.json(null);
    }

    try {
        const [check] = await pool.query('SELECT * FROM Items WHERE id = ?', [id]);
        if (check.length === 0) {
            return res.json({}); 
        }

        await pool.query('UPDATE Items SET name = ?, `desc` = ? WHERE id = ?', [name, desc, id]);
        res.json({ id: Number(id), name, desc });
    } catch (err) {
        console.error(err);
        res.json(null);
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});