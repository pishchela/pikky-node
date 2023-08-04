import express, { Application } from 'express';
// @ts-ignore
const PORT = process.env.PORT | 3000;
const app: Application = express();
const fs = require('fs');

app.use(express.json({ limit: '50mb' }));

app.post('/jira-data', (req, res) => {
    // TODO: here use adapter;
    fs.writeFile('jira.json', JSON.stringify(req.body), () => {});
   res.send();
});

app.listen(PORT, () => {
    console.warn('app is listening on port ' + PORT);
});
