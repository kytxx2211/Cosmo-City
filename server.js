const express = require("express")
const session = require("express-session")
const passport = require("passport")
const DiscordStrategy = require("passport-discord").Strategy

const app = express()

const CLIENT_ID = "1476965429489565898"
const CLIENT_SECRET = "h7pNpxeNLxRpKv0uuOf8PlK--k6cl0Dq"

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

passport.use(new DiscordStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/discord/callback",
  scope: ["identify"]
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}
))

app.use(session({
  secret: "cosmo_secret",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static("public"))

app.get("/auth/discord",
 passport.authenticate("discord")
)

app.get("/auth/discord/callback",
 passport.authenticate("discord",{failureRedirect:"/"}),
 function(req,res){
  res.redirect("/dashboard.html")
 }
)

app.get("/api/user",(req,res)=>{

 if(!req.user){
  return res.json({login:false})
 }

 res.json({
  login:true,
  username:req.user.username
 })

})

app.listen(3000, ()=>{
 console.log("Cosmo City running")
})
