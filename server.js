const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = require('./models/userSchema');
const ProfileSchema = require('./models/userInfoSchema');
const ReservationSchema = require('./models/reserveSchema');
const Users = require('./models/userSchema');



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// app.get('/api/customers', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},

//   ];

//   res.json(customers);
// });

app.post('/api/login', async (req, res) => {
  try {
    const username = req.body.logUser;
    const password = req.body.logPassword;
    const {logUser, logPassword}  = req.body;

    const accExists = await UserSchema.findOne({username: logUser});
    if(!accExists) res.json({error: "User does not exist"});

    const dbPassword = accExists.password; //getting password from the database
    bcrypt.compare(logPassword, dbPassword).then((match) => {
      if(!match) {
        res.json({error: "Wrong user and password combination"});
      }

      //if match, do something about the session
      else {
        res.json({msg: "Logged in"});
      }
    })
  } catch (err) {
    console.log(err)
  }
});

mongoose.connect("mongodb+srv://sakibz:sakibzafar123@beardencluster.cp0uqer.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true})
  .then(() => {
    app.listen(5000, () => {
      console.log('serving port 5000');
    })
  })
  .catch((err)=> {
    console.log(err);
  }); 


// const port = 5000;
// app.listen(port, () => `Server running on port ${port}`);