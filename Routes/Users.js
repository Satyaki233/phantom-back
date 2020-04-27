


const UesrsGet=(req,res,knex)=>{
    res.json('it is working')
}

const UsersPost=(req,res,knex,bcrypt)=>{
  const {username,email,password} = req.body;
  const hash = bcrypt.hashSync(password,10)
  knex.transaction(trx =>{
    trx.insert({
       email : email,
      password : hash
    })
    .into('users')
    .returning('email')
    .then(loginEmail =>{
      return trx('register')
        .returning('*')
        .insert({
            username :username,
            email: loginEmail[0],				
            
        }).then(user =>{
            res.json(user[0]);
        })
    }).then(trx.commit)
    .catch(trx.rollback)
})

.catch(err =>{
    res.send(err);
})
}


module.exports={
   UsersGet : UesrsGet,
   UsersPost: UsersPost
}