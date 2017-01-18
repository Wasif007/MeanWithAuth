var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var loginSchema=new mongoose.Schema({
	hash:String,
	salt:String,
	email:{
		type:String,
		unique:true,
		required:true
	},
	name:{
		type:String,
		required:true
	}
});

loginSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

loginSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

loginSchema.methods.jsonWebTokenGenerating=function(){
	
	var expairyData=new Date();
	expairyData.setDate(expairyData.getDate()+7);
	return jwt.sign({
		_id:this._id,
		email:this.email,
		name:this.name,
		exp: parseInt(expairyData.getTime() / 1000),
	},process.env.JWT_SECRET);
}
mongoose.model('User',loginSchema);