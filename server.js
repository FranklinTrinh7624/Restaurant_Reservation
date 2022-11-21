const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = require('./models/userSchema');
const ProfileSchema = require('./models/userInfoSchema');
const ReservationSchema = require('./models/reserveSchema');



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