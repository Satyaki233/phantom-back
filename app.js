const express = require('express')
const pg = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan=require('morgan');
const bcrypt = require('bcrypt')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'));

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host :'localhost',
      user : 'postgres',
      password :'test',
      database :'medica'
    }
  });

  ///DB tabels


  /// Register

  knex.schema.hasTable('register').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('register', function(t) {
        t.increments('id').primary();
        t.string('username', 30);
        t.string('email', 50);
        t.timestamp('joined').defaultTo(knex.fn.now());
      });
    }
  });
 

  ////Users table
  knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.string('email', 50);
        t.string('password',255);
       
      });
    }
  });


  /////Routes --------------------------------------------------

  const Users = require('./Routes/Users')


  ////Actions-------------------------------------------

  app.get('/',(req,res)=>{
      res.json({message:'api is running'})

  })

   
  app.get('/Users',(req,res)=>{Users.UsersGet(req,res,knex,bcrypt)})
  app.post('/Users',(req,res)=>{Users.UsersPost(req,res,knex,bcrypt)})



  app.listen(process.env.PORT || '8080',()=>{
    
    console.log(`Server is running on the PORT = ${process.env.PORT}`);
    })