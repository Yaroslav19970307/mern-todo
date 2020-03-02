const express = require('express');
const app = express();
const path = require('path');
const key = require('./config/keys');
const port = process.env.PORT || key.port;
const mongoose = require('mongoose');
const mongoURL = key.mongoURL;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');


const mongoDB = mongoose.connect(
    mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
);
mongoDB.then(() => {
    console.log('connected mongoDB');
}).catch((err) => {
    console.log('err', err);
});

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const {AuthRoute, TodoRoute} = require('./routes');
app.use('/api/auth', AuthRoute);
app.use('/api/todos', TodoRoute);
app.get('/api/test', (req, res) => res.json({'test': 'test'}));

app.use(express.static('build'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));


app.listen(port, async () => console.log(`server run on port http://localhost:${port}`));


