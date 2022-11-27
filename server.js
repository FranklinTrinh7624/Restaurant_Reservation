const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = require('./models/userSchema');
const ProfileSchema = require('./models/userInfoSchema');
const ReservationSchema = require('./models/reserveSchema');
//const Users = require('./models/userSchema');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);


//app.use(express.static(path.join(__dirname,'client','build')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['POST','PUT','GET','OPTIONS','HEAD'],
    credentials: true
}));

const store = new MongoDBSession({
    uri:'mongodb+srv://ftrinh777:ftrinh777@clusterbear.lagbzdc.mongodb.net/BearDen?retryWrites=true&w=majority',
    collection: "mysessions",

})

const oneDay = 1000 * 60 * 60 *24;
app.use(session({ //intializing the session parameters
    secret: 'secretkey',
    name: 'session-id',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    store: store,
}));



function dinerNumberDigit(min, max){
    return (Math.floor(Math.random() * (max - min) + min))
}

app.post('/api/register', async (req,res) => {

    try{
        let checker = true;
        let digit;
        while(checker)
        {
            digit = dinerNumberDigit(1000000000, 9999999999);
            let checkDigitExists = await ProfileSchema.findOne({dinerNumber: digit});
            if(checkDigitExists) continue;
            else {checker = false;}
        }

        let exists = await UserSchema.findOne({username: req.body.regiUsername});
        if(exists) {
            res.json({error: "User already exists"})
        }
        else if(req.body.regiUsername.length < 8){
            return res.json({error1: "User should be 8 characters minimum"});
        }
        else if(req.body.regiPassword.length < 8){
            return res.json({errror2: "Password should be 8 chracters minimum"});
        }

        let hashpass;
        hashpass = bcrypt.hash(req.body.regiPassword, 10).then((hash) => {
            const freshAcc = new UserSchema({
                username: req.body.regiUsername,
                password: hash
            })
            freshAcc.save()
            .then((result)=> {
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        const additionalInfo = new ProfileSchema({
            username: req.body.regiUsername,
            firstname: req.body.firstn,
            lastname: req.body.lastn,
            mailingAdd: req.body.mailAddy,
            billingAdd: req.body.billAddy,
            dinerNumber: digit,
            preferPayment: req.body.paymentOpt,
            //have earned points set to zero
            earnedPoints: 0,
        })
        additionalInfo.save()
        .then((result)=> {
            console.log(result);
        })
        .catch((err)=> {
            console.log(err);
        })

        res.json({msg:"Account Created"});

    } catch(errr) {
        console.log(errr);
    }

});


app.post('/api/login', async (req, res) => {
    try {
    // const username = req.body.logUser;
    // const password = req.body.logPassword;
        const {logUsername, logPassword}  = req.body;

        const accExists = await UserSchema.findOne({username: logUsername});
        if(!accExists) return res.json({error: "User does not exist"});

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

        const userSession = {username: accExists.username}
        req.session.user = userSession;


        } catch (err) {
        console.log(err)
    }
});

app.get('/api/profile', async (req,res) => {  //get profile info and send to front end to be displayed
    console.log(typeof(req.session.user)) //for testing purposes

    //on the assumption the user is logged in
    const myJSON = JSON.stringify(req.session.user);
    let obj = JSON.parse(myJSON);
    console.log(typeof(obj.username)); //for testing, should be string

    const customerProfile = await ProfileSchema.find({username: obj.username});

    if(!customerProfile) return res.json({error: "Cannot retrieve profile"});
    res.send(customerProfile);
});

app.put('/api/update', async (req,res)=>{
  const myJSON = JSON.stringify(req.session.user);
  let obj = JSON.parse(myJSON);
  console.log(typeof(obj.username)); //for testing, should be string

  try{
    const filter = {
      firstname: req.body.uptFirstName,
      lastname: req.body.uptLastName,
      mailingAdd: req.body.uptMailAddress,
      billingAdd: req.body.uptBillAddress,
      preferPayment: req.body.uptPayMethod,
    }
    const getProfile = await ProfileSchema.findOneAndUpdate({username: obj.username}, filter, {new: true});
    return res.json({msg: "Success update"});

  } catch (error) {
    console.log(error);
    res.json({err: "Something went with update"});
  }


})


app.post('/logout', (req, res) => {
  try {
      req.session.destroy()
      res.clearCookie('session-id', {domain:'localhost', path:'/'})
      res.send("User logged out.")
  } catch (err) {
      console.log(err)
  }
});

app.get('/isAuth', async (req,res)=>{
    if(req.session.user) {
        console.log("you are here")
        return res.json(req.session.user)
    } else {
        console.log("unauthorized")
        return res.json({error:'In unauthorized state, please login'})
    }
})


mongoose.connect("mongodb+srv://ftrinh777:ftrinh777@clusterbear.lagbzdc.mongodb.net/BearDen?retryWrites=true&w=majority", {useNewUrlParser: true})
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