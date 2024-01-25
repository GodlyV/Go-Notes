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


app.get('/GET/notes', (req, res) => {
    const uId = req.query.uid;
    const select = `SELECT * from notes where uid =${uId} ORDER BY last_modified DESC`;
    pool.query(select,(err,result)=>{
        res.send(result.rows);
    })
});

app.put('/PUT/notes/:uid/:nid', (req, res) => {
    const title =req.body.title;
    const text =req.body.text;
    const time = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');
    const updateNotes = `UPDATE notes SET title = '${title}', text = '${text}', last_modified = '${time}' WHERE uid = ${req.params.uid} AND nid = ${req.params.nid}`;
    pool.query(updateNotes,(err,result)=>{
        res.send(result.rows);
    })
});

app.delete('/DELETE/notes/:uid/:nid', (req, res) => {
    const deleteNotes = `DELETE FROM notes WHERE uid = ${req.params.uid} AND nid = ${req.params.nid}`;
    pool.query(deleteNotes,(err,result)=>{
        return res.json({
            message: 'DELETE',
        });
    })

});

app.post('/POST/notes/:uid', (req, res) => {
    const title =req.body.title;
    const text =req.body.text;
    const time = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');
    const insert = `INSERT INTO notes (uid, title,text,last_modified) VALUES ( ${req.params.uid},'${title}', '${text}', '${time}')`;
    pool.query(insert,(err,result)=>{
        res.send(result.rows);
    });
});

        

app.listen(port, () => {
    console.log(`Dormakaba Notes Backend listening on port:${port}`);
});