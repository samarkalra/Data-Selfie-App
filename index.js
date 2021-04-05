const express = require('express');
const Datastore = require('nedb');

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req, res) => {
    res.json(database.getAllData());
});
app.post('/api', (req, res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    res.json(data);
});