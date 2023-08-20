import express, { Application } from 'express';
import http  from 'http';
import cors  from 'cors';

import './socket/socket';
// @ts-ignore
const PORT = process.env.PORT | 3000;
const app: Application = express();
const fs = require('fs');

app.use(cors({
    origin: [
        'http://localhost:3000',
    ],
    methods: ['POST', 'GET'],
}));
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);

app.post('/jira-data', (req, res) => {
    // TODO: here use adapter;
    fs.writeFile('jira.json', JSON.stringify(req.body), () => {});
   res.send();
});

server.listen(PORT, () => {
    console.warn('app is listening on port ' + PORT);
});
