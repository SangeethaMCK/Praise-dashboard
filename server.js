import express from 'express';
import client from './db.js';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM employeeDetails');
        res.json(result.rows); 
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Error retrieving users' });
    }
});

app.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
       await client.query('INSERT INTO employeeDetails (username, email) VALUES ($1, $2)', [name, email]);
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Error adding user' });
    }
});

app.get('/praise', async (req, res) => {
    try {
        const result = await client.query(`SELECT praisedBy, sendTo, content, TO_CHAR(date, 'DD Mon YYYY') AS formatted_date FROM praises;`);
        res.status(200).json(result.rows); 
    } catch (err) {
        console.error('Error retrieving praises:', err);
        res.status(500).json({ error: 'Error retrieving praises' });
    }
});

app.post('/praise', async (req, res) => {
    try {
        const { praisedBy, sendTo, content, date } = req.body;
        await client.query('INSERT INTO praises (praisedBy, sendTo, content, date) VALUES ($1, $2, $3, $4)', [praisedBy, sendTo, content, date]);
        res.status(201).json({ message: 'Praise posted successfully' });
    } catch (err) {
        console.error('Error posting praise:', err);
        res.status(500).json({ error: 'Error posting praise' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
