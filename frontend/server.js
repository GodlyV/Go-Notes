const express = require('express');
const postgres = require('pg');
const cors = require('cors');
const port = 3001;

const db = postgres.createPool({
    host:'postgres_db',
    user: 'postgres',
    password: 'postgres',
    database: 'notes',
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    const select = "SELECT * from notes";
    db.query(select,(err,result)=>{
        res.send(result);
    })
});

app.listen(port, () => {
    console.log(`Dormakaba Notes Backend listening on port:${port}`);
});