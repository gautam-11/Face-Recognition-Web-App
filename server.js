
const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const knex = require('knex');

const Register = require('./controllers/Register');

const Signin = require('./controllers/Signin');

const Profile = require('./controllers/Profile');

const Image = require('./controllers/Image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'facedetect'
  }
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/' , (req , res) => { res.status(200).json('Success')});

app.post('/signin' , (req , res) => { Signin.handleSignin(req, res , db , bcrypt)} );

app.post('/register' , (req , res ) => { Register.handleRegister(req , res , db , bcrypt)});

app.get('/profile/:id' , (req , res) => {Profile.handleProfile(req , res, db)});

app.put('/image' , (req , res) => {Image.handleImage(req , res , db)});

app.post('/imageurl' , (req , res) => {Image.handleApiCall(req , res)}); 

app.listen( process.env.PORT || 3000 , () => {

	console.log(`app is running on port 3000 ${process.env.PORT}`);
});