require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT;
const host = process.env.HOST;

const corsOptions = {
    // origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).json({
        message: 'Home -- EmoChamp API'
    });
});

app.use('/login', require('./routes/login.routes.js'))

app.use('/patients', require('./routes/patients.routes.js'))
app.use('/psychologists', require('./routes/psychologists.routes.js'))

app.use('/admins', require('./routes/admins.routes.js'))
app.use('/emotions', require('./routes/emotions.routes.js'))


app.all('*', function (req, res) {
    res.status(404).json({
        message: 'Not found'
    });
})

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));