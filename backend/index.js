const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');
const port = 3001;


const pool = new Pool({
    host:'postgres_db',
    user: 'postgres',
    password: 'postgres',
    database: 'notes',
    port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    const select = "SELECT * from users";
    pool.query(select,(err,result)=>{
        res.send(result.rows);
    })
});
app.get('/notes', (req, res) => {
    const select = "SELECT * from notes";
    pool.query(select,(err,result)=>{
        res.send(result.rows);
    })
});

app.listen(port, () => {
    console.log(`Dormakaba Notes Backend listening on port:${port}`);
});