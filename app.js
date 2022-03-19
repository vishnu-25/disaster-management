const express=require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
// const req = require("express/lib/request");
// const res = require("express/lib/response");
const mongoose=require("mongoose");

const app=express();
app.set("view engine","ejs")
app.use(express.urlencoded({
    extended :true
}))
var count = 0 ;
var uname = "";
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/disaster",{ useNewUrlParser: true , useUnifiedTopology: true})
const FundSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    date:String,
    gender:String,
    address:String,
    city:String,
    country:String,
    amount:Number
})
const fund = new mongoose.model("fund",FundSchema);

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const user = new mongoose.model("user",UserSchema);

const recoverySchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    phno:String,
    date:String,
    month:String,
    year:String,
    disaster:String,
    address:String,
    city:String,
    country:String,
    amount:String
})

const Recovery = new mongoose.model("recovery",recoverySchema)

const feedSchema = new mongoose.Schema({
    name:String,
    email:String,
    feedback:String
})

const feed =new mongoose.model("feed",feedSchema)

app.get("/",function(request,response)
{
    response.render("index");
})
app.get("/fund",function(request,response)
{
    if(count == 1){
        response.render("home");
    }
    else{
        response.redirect("/signin");
    }
})
app.get("/recovery",function(request,response)
{
    if(count == 1){
        response.render("recover",{messege:""})
    }
    else{
        response.redirect("/signin");
    }
})
app.get("/feedback",function(request,response)
{
    if(count == 1){
    response.render("feedback",{messege:""});
    }
    else{
        response.redirect("/signin");
    }
})
app.get("/registerform",function(request,response)
{
    if(count == 1){
        fund.find({},function(e,found){
            if(!e)
            {
                response.render("registerform",{found:found,uname:uname});
            }
        })
    }
    else{
        response.redirect("/signin");
    }
})
app.post("/registerform",function(request,response)
{
   const Fund = new fund({
    firstname:request.body.fname,
    lastname:request.body.lname,
    email:request.body.email,
    phone:request.body.pass,
    date:request.body.date,
    gender:request.body.gender,
    address:request.body.address,
    city:request.body.city,
    country:request.body.country,
    amount:request.body.amount
   })
   Fund.save(function(e)
   {
       if(e)
       {
           console.log("Error at save the form");
       }
       else
       {
        fund.find({},function(e,found){
            if(!e)
            {
                response.render("registerform",{found:found,uname:uname});
            }
        })
       }
   })
})

app.post("/recovery",function(request,response){
    const recovery = new Recovery({
        fname:request.body.fname,
        lname:request.body.lname,
        email:request.body.email,
        phno:request.body.phno,
        date:request.body.date,
        month:request.body.month,
        year:request.body.year,
        disaster:request.body.disaster,
        address:request.body.address,
        city:request.body.city,
        country:request.body.country,
        amount:request.body.amount
    })
    recovery.save(function(e){
        if(!e)
        {
            response.render("recover",{messege:"Amount Transfered successfully!!"})
        }
    })
})

app.get("/signin",function(request,response)
{
    response.render("sigin",{messege:""});
})
app.get("/signup",function(request,response)
{
    response.render("signup",{messege:""});
})

app.get("/logout",function(request,response){
    if(count==1)
    {
        uname = "";
        count = 0;
        response.redirect("/signin");
    }
    else{
        response.redirect("/signin");
    }
})

app.post("/signup",function(request,response)
{
    const name = request.body.name;
    user.findOne({name:name},function(e,found)
    {
        if(e)
        {
            console.log(e);
        }
        else
        {
            if(found)
            {
                response.render("signup",{messege:"username already Exists"})
            }
            else
            {
                const User = new user({
                    name:request.body.name,
                    email:request.body.email,
                    password:request.body.password
                })
                User.save(function(e)
                {
                    if(e){
                    console.log("Error found during save to the database");
                    }
                    else
                    {
                        response.redirect("/signin");
                    }
                })
            }
        }
    })
})

app.post("/signin",function(request,response)
{
    const name = request.body.email;
    const password = request.body.password;
    user.findOne({email:name},function(e,found)
    {
        if(e)
        {
            console.log(e);
        }
        else
        {
            if(found)
            {
                if(found.password==password)
                {
                    uname = name;
                    count =1;
                    response.redirect("/recovery");
                }
                else{
                    response.render("sigin",{messege:"Incorrect Password"});
                }
            }
            else{
                response.render("sigin",{messege:"Incorrect Username"});
            }
        }
    })
})

app.post("/feedback",function(request,response){
    const Feed = new feed({
        name:request.body.name,
        email:request.body.email,
        feedback:request.body.feedback
    })
    Feed.save(function(e){
        if(!e)
        {
            response.render("feedback",{messege:"Feedback Saved!!"});
        }
    })
})

app.listen(5000,function()
{
    console.log("server is running");
})