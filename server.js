var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 8080;

// var connection = mysql.createConnection({
//     host : '192.168.64.2',
//     user : 'root',
//     password : '1234',
//     database : 'M8login'
// });

// var app = express();
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// app.get('/', function(request,response) {
//     response.sendFile(path.join(__dirname + '/login.html'));
// });

// app.post('/auth',function(request,response) {
//     var username = request.body.username;
//     var password = request.body.password;
//     if (username && password) {
//         connection.query('SELECT * FROM M8login WHERE email = ? AND password = ?', [username, password], function(error, results,fields) {
//             if(results.length > 0) {
//                 request.session.loggedin = true;
//                 request.session.loggedin = username;
//                 response.redirect('/index');
//             } else {
//                 response.send('Incorrect')
//             }
//             response.end();
//         });
//     } else {
//         response.send('Please enter Username and Password!')
//         response.end();
//     }
// });

// app.get('/index',function(request, response) {
//     if(request.session.loggedin){
//         response.send('Welcome back' + request.session.username)
//     } else {
//         response.send('Please login')
//     }
//     response.end();
// });

app.use(passport.initialize())
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "1253294465098287",
    clientSecret: "cbfe4b3d9b88e25c5cb96f67e6b89223",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(req,accessToken, refreshToken, profile, done) {
    try{
        console.log(req);
        if(profile){
            req.user = profile;
            done(null,profile);
        }
    }catch(err){
        done(err);
    }
  })
);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    session: false, 
    failureRedirect: 'http://localhost:8080' 
  }),(req,res)=>{
    res.redirect('http://localhost:8080/')
  });


                                      

app.listen(8080, () => {
    console.log(`Server is running on port : ${PORT}`)
})

module.exports = app