const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const serveStatic = require('serve-static');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(favicon(path.join('public', 'images', 'favicon.ico')));
app.use(serveStatic(path.join(__dirname, "public"), {
    cacheControl: true,
    immutable: true,
    maxAge: 86400000, // 24 hours
    lastModified: false
}));
app.use(express.static('public'));
app.use(compression({ level: 9 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", "'unsafe-inline'", "stackpath.bootstrapcdn.com", "localhost:3000", "www.cict2020.iiitdm.ac.in", "cict2020.herokuapp.com"],
            imgSrc: ["'self'", "localhost:3000", "www.cict2020.iiitdm.ac.in", "cict2020.herokuapp.com", "via.placeholder.com"],
            fontSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "localhost:3000", "www.cict2020.iiitdm.ac.in", "cict2020.herokuapp.com", "stackpath.bootstrapcdn.com", "fonts.googleapis.com", "fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "localhost:3000", "www.cict2020.iiitdm.ac.in", "cict2020.herokuapp.com", "code.jquery.com", "stackpath.bootstrapcdn.com", "unpkg.com", "cdn.jsdelivr.net"]
        }
    }
}));

app.post('/', (req, res) => {
    const email = req.body.email;
    fs.appendFile("emails.csv", `${email}\n`, function (err) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

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
    const steering = JSON.parse(fs.readFileSync('content/steering.json'));
    const tpc = JSON.parse(fs.readFileSync('content/tpc.json'));

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
        advisory: advisory,
        tpc: tpc
    }
    res.render('committees', options);
});

app.get('/authors', (req, res) => {
    const tracks = JSON.parse(fs.readFileSync('content/tracks.json'));
    const updates = JSON.parse(fs.readFileSync('content/updates.json'));
    res.render('cfp', { route: "cfp", tracks: tracks, updates: updates });
});

app.get('/register', (req, res) => {
    res.render("register", { route: "register" });
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});