var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
	usernameField:'email'
},function(username,password,done){
User.findOne({email:username},function(err,user)
{
if(err)
{
	return done(err);
}
if(!user)
{
	return done(null,false,{
		message:"Email is not Found"
	})
}
if(!user.validPassword(password))
{
	return done(null,false,{
		message:"Password is not valid"
	})
}
return done(null,user);
});
}));