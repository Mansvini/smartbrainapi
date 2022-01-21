import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //where database lives
    port : 5432,
    user : 'mansviniaggarwal',
    password : '',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then (data=>{
// 	console.log(data);
// })

const app=express();

app.use(express.json());
app.use(cors());

app.get('/',(req, res)=>{res.send(database.users)})
app.post('/signin',handleSignIn(db, bcrypt))
app.post('/register', (req, res)=>{handleRegister(req, res, db, bcrypt)}) //Dependency Injection
app.get('/profile/:id',(req, res)=>{handleProfileGet(req, res, db)})
app.put('/image',(req, res)=>{handleImage(req, res, db)})
app.post('/imageurl',(req, res)=>{handleApiCall(req, res)})

app.listen(3000,()=>{
	console.log('app is running on port 3000');
});