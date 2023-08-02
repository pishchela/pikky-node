const express = require('express');
const port = process.env.PORT | 3000;
const app = express();
const fs = require('fs');

app.use(express.json({ limit: '50mb' }));

app.post('/jira-data', (req, res) => {
    fs.writeFile('jira.json', JSON.stringify(req.body), () => {});
   res.send();
});

app.listen(port, () => {
    console.warn('app is listening on port ' + port);
});
