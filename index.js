const { query } = require('express');
const express = require('express');
const path=require('path');
const port=7000;

//before express we have to do this mongoose require thing
const db=require('./config/mongoose');
//using the schema we created using mongoose in contact.js
const Contact = require('./models/contact');

const app= express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

// //middleware 1 called
// app.use(function(req,res,next){
//     req.myName="Ayushi";
//   //console.log('middleware1 called');
//   next();
// });
// //middleware 2 called
// app.use(function(req,res,next){
//     console.log("myname made by mw1 from mw2",req.myName);
//    // console.log('middleware2 called');
//     next();
//   });

app.use(express.static('assets'));

var contactList=[
    {
        name:"Ayushi",
        phone:"1111"
    },
    {
        name:"abcd",
        phone:"1234567"
    },
    {
        name:"nbvcx",
        phone:"9876543"
    }
]

app.get('/',function(req,res){
    //console.log(req);
    //console.log(__dirname);
   // res.send('<h1>Cool,it is running! or is it?</h1>');
   //Since we are rendering the files remove res.send vala code 
  // console.log("myname made by mw1 from controller(get)",req.myName);

//fetching the data from the database
Contact.find({},function(err,contacts){
    if(err){
        console.log('Error in fetching contacts from database');
        return ;
    }
    return res.render('home',{
        title: "My contact list",
        contact_list: contacts
     });
});  
});

//here in get , ham home and practice files jo views folder mai jo hai unhe render kar rhe 

app.get('/practice', function(req,res){
    return res.render('practice',{title:"Let us play with ejs"});
});

//here in post mai hame form ka data mil rha hai aur ham usse practice file ko redirect kar rhe hai

app.post('/create-contact',function(req,res){
    //return res.redirect('/practice');
    //console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);we dont need this becoz now we want to send
    // data to the database.
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
      }
    );
   // return res.redirect('/');
//    return res.redirect('back');
});

//for deleting contact 
app.get('/delete-contact',function(req,res){
    //console.log(req.query);
    // let phone= req.query.phone;
    // let contactIndex= contactList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
 
    //get the id from query in the ul
    let id= req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from the database');
            return ;
        }
          
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error is running the server',err);
    }
    console.log('Yup! Expresss Server is running on port:',port);
});