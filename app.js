const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { route: "index" });
});

app.get('/committees', (req, res) => {
    res.render('committees', { route: "committees" });
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});