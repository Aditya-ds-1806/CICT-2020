const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const speakers = JSON.parse(fs.readFileSync('content/speakers.json'));
    const tracks = JSON.parse(fs.readFileSync('content/tracks.json'));
    const updates = JSON.parse(fs.readFileSync('content/updates.json'));
    res.render('index', { route: "index", speakers: speakers, tracks: tracks, updates: updates });
});

app.get('/about', (req, res) => {
    res.render('about', { route: "about" });
});

app.get('/committees', (req, res) => {
    const patrons = JSON.parse(fs.readFileSync('content/patrons.json'));
    const advisory = JSON.parse(fs.readFileSync('content/advisory.json'));
    const gc = JSON.parse(fs.readFileSync('content/general-chairs.json'));
    const oc = JSON.parse(fs.readFileSync('content/oc.json'));
    const trc = JSON.parse(fs.readFileSync('content/trc.json'));
    const coc = JSON.parse(fs.readFileSync('content/coc.json'));
    const wie = JSON.parse(fs.readFileSync('content/wie.json'));
    const industry = JSON.parse(fs.readFileSync('content/industry.json'));
    const student = JSON.parse(fs.readFileSync('content/student.json'));
    const phdSymposium = JSON.parse(fs.readFileSync('content/phd-symposium.json'));
    const steering = JSON.parse(fs.readFileSync('content/steering.json'))

    var options = {
        route: "committees",
        patrons: patrons,
        gc: gc,
        oc: oc,
        trc: trc,
        coc: coc,
        wie: wie,
        phdSymposium: phdSymposium,
        industry: industry,
        student: student,
        steering: steering,
        advisory: advisory
    }
    res.render('committees', options);
});

app.get('/authors', (req, res) => {
    const tracks = JSON.parse(fs.readFileSync('content/tracks.json'));
    res.render('cfp', { route: "cfp", tracks: tracks });
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});