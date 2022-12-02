const express = require('express');
const session = require('express-session');
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
const MongoDBSession = require('connect-mongodb-session')(session);
const holiday = require('./holiday.json');


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
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    store: store,
}));

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function dinerNumberDigit(min, max){
    return (Math.floor(Math.random() * (max - min) + min))
}

function hasWhiteSpace(arg) {
    return (/\s/).test(arg);
}

function isEmailValid(email) {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

function getSinglesExact(availTables,wantedSeats,saveThis){
    let availCombinations = []
    for(t=0; t<availTables.length; t++){ 
        if(availTables[t][1] == wantedSeats){
          availCombinations.push(availTables[t])
        }
    }
  
    if(availCombinations.length == 0) {
      //console.log("singles false")
      return false;
    }
    else { //we know availCombinations has something in it
      if(saveThis.length == 0) {
        return availCombinations[0]
      }
  
    }
  
  }
  
  function getSinglesAtLeast(availTables,wantedSeats,saveThis) {
    let availCombinations = []
    for(t=0; t<availTables.length; t++){ 
      if(availTables[t][1] > wantedSeats){
        availCombinations.push(availTables[t])
      }
    }
    if(availCombinations.length == 0) {
      //console.log("singles at least false")
      return false
    }
    else {
      if(saveThis.length == 0) {
        return availCombinations[0]
      }
    }
  }
  
  function getDoublesExact(availTables,wantedSeats,saveThis) {
    let availCombinations = []
    for( i=0; i<availTables.length; i++){
        for(j= i+1 ;j<availTables.length; j++){
            if (availTables[i][1] + availTables[j][1] == wantedSeats){                
                availCombinations.push([availTables[i], availTables[j]]);       
            }
        }
    }
    if(availCombinations.length == 0) {
      //console.log("doubles false")
      return false
    }
    else {
      if(saveThis.length == 0) {
        return availCombinations[0]
      }
      else {
          let tempHere = []
          for(g=0; g<availTables.length; g++){
            if(saveThis[0]==availTables[g][0]){
              //console.log("index3 is ", g
              tempHere.push(availTables[g])
              for( i=0; i<availTables.length; i++){
                 if (availTables[g][1] + availTables[i][1] == wantedSeats){
                   tempHere.push(availTables[i])
                   return tempHere
               }
            }
          }
        }
        
      }
    }
    
  }
  
  function getDoublesAtLeast(availTables,wantedSeats,saveThis) {
    let availCombinations = []
    for( i=0; i<availTables.length; i++){
      for(j= i+1 ;j<availTables.length; j++){
          if (availTables[i][1] + availTables[j][1] > wantedSeats){                
              availCombinations.push([availTables[i], availTables[j]]);       
          }
      }
    }
    if(availCombinations.length == 0) {
      //console.log("doubles at least false")
      return false
    }
    else {
      if(saveThis.length == 0) {
        return availCombinations[0]
      }
      else {
        let tempHere = []
          for(g=0; g<availTables.length; g++){
            if(saveThis[0]==availTables[g][0]){
              //console.log("index3 is ", g
              tempHere.push(availTables[g])
              for( i=0; i<availTables.length; i++){
                if (availTables[g][1] + availTables[i][1] > wantedSeats){
                   tempHere.push(availTables[i])
                   return tempHere
               }
            }
          }
        }  
      }
    }
    
  }
    
function spliceFunction(availTables,wantedSeats,spliceThis, saveThis){
    let availCombinations = []
    let whatever = availTables
    if(spliceThis[1]===undefined){
      const indexValue1 = spliceThis[0];
      for(let y=0; y<availTables.length; y++){
        if(indexValue1==whatever[y][0]){
          const index = y
          //console.log("index is ", index);
          if (index > -1) { 
          whatever.splice(index, 1);         
          }
        }
      }
      let singlesExact =  getSinglesExact(availTables,wantedSeats,saveThis)
      let singlesAtLeast =  getSinglesAtLeast(availTables,wantedSeats,saveThis)
      let doublesExact =  getDoublesExact(availTables,wantedSeats,saveThis)
      let doublesAtLeast =  getDoublesAtLeast(availTables,wantedSeats,saveThis)
      if(singlesExact){
        //console.log(singlesExact, "singles")
        return singlesExact
      }
      else if(singlesAtLeast) {
        //console.log(singlesAtLeast,  "singles at least")
        return singlesAtLeast
      }
      else if(doublesExact) {
        //console.log(doublesExact, "doubles")
        return doublesExact
      }
      else if(doublesAtLeast) {
        //console.log(doublesAtLeast,  "doubles at least")
        return doublesAtLeast
      }
      
    }
      
    else 
    {
      const indexValue1 = spliceThis[0];
  
      const indexValue2 = spliceThis[1];
  
      for(let z=0; z<availTables.length; z++){
        if(indexValue1==availTables[z][0]){
  
          const index = z
          //availCombinations.push(whatever[index])
         // console.log("index is ", index);
          if (index > -1) { 
          availTables.splice(index, 1); 
        
  
          }
  
        }
      }
  
      for(let x = 0; x < availTables.length; x++){
        if(indexValue2==availTables[x][0]){
          const index2 = x
          //availCombinations.push(whatever[index2])
          //console.log("index2 is ", index2);
          if (index2 > -1) { 
          availTables.splice(index2, 1);
  
          }
        }
      
      }
      let singlesExact =  getSinglesExact(availTables,wantedSeats,saveThis)
      let singlesAtLeast = getSinglesAtLeast(availTables,wantedSeats,saveThis)
      let doublesExact =  getDoublesExact(availTables,wantedSeats,saveThis)
      let doublesAtLeast =  getDoublesAtLeast(availTables,wantedSeats,saveThis)
      if(singlesExact){
        //console.log(singlesExact, "singles2")
        return singlesExact
      }
      else if(singlesAtLeast) {
        //console.log(singlesAtLeast,  "singles at least2")
        return singlesAtLeast
      }
      else if(doublesExact) {
        //console.log(doublesExact, "doubles2")
        return doublesExact
      }
      else if(doublesAtLeast) {
        //console.log(doublesAtLeast,  "doubles at least2")
        return doublesAtLeast
      }
      
    }
  }


async function checkTables(dater,timer, guester, tabler){
    let availTables = [[1,2],[2,2],[3,2],[4,2],[5,4],[6,4],[7,4],[8,6],[9,6],[10,8],[11,8]]
    let tempCollection = await ReservationSchema.find({date: dater, time: timer},'reservedTables').exec();
    if(!tempCollection) return false
    //if temp collection doesnt exist return
    //console.log(tabler) //"3,7"
    let textTable = "";
    for(let i = 0; i < tempCollection.length;i++) {
        if(i == tempCollection.length - 1) {
            textTable += tempCollection[i].reservedTables;
        }
        else {
            textTable += tempCollection[i].reservedTables + ","; //"3,7,2"
        }
    }
    //split the strings to get array of strings
    const myArr = tabler.split(",") //["3", "8"] <- tables customer wants 10  3,4 8,6
    const textTableArr = textTable.split(",") //["3","7","2"] tables taken
    let tobeSpliced = [] //["3"] //tables are already reserved
    let tobeSaved = [] //["8"]  //tables not reserved yet

    for(let i in myArr) {
        if(textTableArr.includes(myArr[i])) {
            tobeSpliced.push(parseInt(myArr[i]))
        } else {
            tobeSaved.push(parseInt(myArr[i]))
        }
    }
    console.log(tobeSpliced)
    if(tobeSpliced.length == 0) { //if the toBeSpliced array is empty
        const tempTables = tabler
        return tempTables;
    }
    else{
        let temp = spliceFunction(availTables,guester, tobeSpliced, tobeSaved)
        console.log(temp)
        if(temp == false) {
            return tempTables;
        }
        else if(temp) {
            const storing = temp.toString().split(",");
            let final = []
            if(storing.length == 4) {
                final.push(storing[0])
                final.push(storing[2])
            }
            else if(storing.length == 2) {
                final.push(storing[0])
            }
            return final.toString()
            
        }
    }


}
    //console.log(textTable)

    //console.log(tempCollection)
    // console.log(tempCollection[i].reservedTables)
    // console.log(typeof(tempCollection[i].reservedTables))




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
        else if(hasWhiteSpace(req.body.regiUsername)) {
            return res.json({error1: "Username should not have whitespace"});
        }
        else if(req.body.regiPassword.length < 8){
            return res.json({errror2: "Password should be 8 chracters minimum"});
        }
        else if(hasWhiteSpace(req.body.regiPassword)) {
            return res.json({error2: "Password should not have whitespace"});
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

// app.get('/tables', async (req,res)=>{
//     //call table function
//     //console log to check
//     //send to front end
// })

app.post('/api/holiday', async(req,res)=>{


    for(let i = 0; i < holiday.holidays.length; i++) {
        let object = holiday.holidays[i]
        for(let property in object) {
            if(req.body.date.includes(object[property])) {
                return res.json({message: "Traffic Day"})
            }
            else {continue}
        }
    }
    res.json({message: "None"})

})

app.post('/api/reservation', async(req,res)=>{
    //call reservation schema
    //fill it out and save
    try {

        if(req.body.rePhone.length >= 11) {
            return res.json({error: "phone number too long"})
        }
        
        //const newTable = 
        //console.log("you are in before function call");
        
        if(!isEmailValid(req.body.reEmail)) {
            return res.json({error: "Invalid Email"})
        }

        const tempDate = new Date();
        const storeUserDate = new Date(req.body.reDate)
        if(storeUserDate < tempDate) {
            return res.json({error: "You are going back in time, pick another date"})
        }
        let replaceWith = await checkTables(req.body.reDate, req.body.reTime, req.body.reGuest, req.body.reTable);
        console.log(replaceWith)

        if(req.session.user) {
            const myJSON = JSON.stringify(req.session.user);
            let obj = JSON.parse(myJSON);

            const getProfileInfo = await ProfileSchema.findOne({username: obj.username});
            if(!getProfileInfo) return res.json({error: "We could not get your info"});
            else {
                if(replaceWith === req.body.reTable) {
                    const makeReserve = new ReservationSchema({
                        username: obj.username,
                        firstname: getProfileInfo.firstname, 
                        lastname: getProfileInfo.lastname,
                        phone: req.body.rePhone, //dont forget req.body before rePhone
                        email: req.body.reEmail,
                        date: req.body.reDate,
                        time: req.body.reTime,
                        numGuest: req.body.reGuest,
                        reservedTables: req.body.reTable,
                        ccNumber: req.body.creditNum,
                        ccExpire: req.body.creditExp,
                        ccv: req.body.creditCCV,
                    });
                    makeReserve.save()
                } else {
                    const makeReserve = new ReservationSchema({
                        username: obj.username,
                        firstname: getProfileInfo.firstname, 
                        lastname: getProfileInfo.lastname,
                        phone: req.body.rePhone, //dont forget req.body before rePhone
                        email: req.body.reEmail,
                        date: req.body.reDate,
                        time: req.body.reTime,
                        numGuest: req.body.reGuest,
                        reservedTables: replaceWith,
                        ccNumber: req.body.creditNum,
                        ccExpire: req.body.creditExp,
                        ccv: req.body.creditCCV,
                    });
                    makeReserve.save()
                }

                return res.json({msg: "RESERVED"})
            }


        }
        else {
            if(replaceWith === req.body.reTable) {
                const makeReserveGuest = new ReservationSchema({
                    username: '',
                    firstname: req.body.reFirstn, //req.body in front
                    lastname: req.body.reLastn,
                    phone: req.body.rePhone,
                    email: req.body.reEmail,
                    date: req.body.reDate,
                    time: req.body.reTime,
                    numGuest: req.body.reGuest,
                    reservedTables: req.body.reTable,
                    ccNumber: req.body.creditNum,
                    ccExpire: req.body.creditExp,
                    ccv: req.body.creditCCV,
    
                })
                makeReserveGuest.save()
            } else {
                const makeReserveGuest = new ReservationSchema({
                    username: '',
                    firstname: req.body.reFirstn, //req.body in front
                    lastname: req.body.reLastn,
                    phone: req.body.rePhone,
                    email: req.body.reEmail,
                    date: req.body.reDate,
                    time: req.body.reTime,
                    numGuest: req.body.reGuest,
                    reservedTables: replaceWith,
                    ccNumber: req.body.creditNum,
                    ccExpire: req.body.creditExp,
                    ccv: req.body.creditCCV,
    
                })
                makeReserveGuest.save()
            }
            return res.json({msg: "RESERVED FOR GUEST"})
        }

        res.json({error: "Something went wrong, could not reserve"})
    } catch(err) {
        console.log("error in api reserve")
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