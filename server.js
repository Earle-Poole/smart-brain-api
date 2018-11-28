const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileId = require('./controllers/profileId');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('it is working!');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )
app.get('/profile/:id', (req, res) => {profileId.handleProfileId(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)} )
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )
app.post('/generalmodelurl', (req, res) => {image.handleGeneralModelApiCall(req, res)} )

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`The server is listening on port ${PORT}`)
})

console.log(PORT);