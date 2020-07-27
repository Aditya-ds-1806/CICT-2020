const express = require('express');
const app = express();
const fs = require('fs');
const { json } = require('express');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { route: "index" });
});

app.get('/committees', (req, res) => {
    const patrons = JSON.parse(fs.readFileSync('content/patrons.json'));
    var options = {
        route: "committees",
        patrons: patrons
    }
    res.render('committees', options);
});

app.get('/call-for-papers', (req, res) => {
    res.render('cfp', { route: "cfp" });
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});