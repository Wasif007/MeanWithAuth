var passport=require('passport');
var mongoose=require('mongoose');
var user=mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
res.status(status);
res.json(content);
};
module.exports.login=function(req,res)
{
	if(!req.body.email || !req.body.password)
	{
		sendJSONresponse(res,404,{
			"message":"Provide  email and password to LogIn"
		})
		return;
	}
	passport.authenticate('local',function(err,user,info){
		var token;
		if(err)
		{
			sendJSONresponse(res,404,
				{"message":err});
			return;
		}
		if(user)
		{
			
			token=user.jsonWebTokenGenerating();
			sendJSONresponse(res,200,{
				"token":token
			})
		}
		else {
sendJSONresponse(res, 401, info);
	}
})(req,res);
}

module.exports.signup=function(req,res)
{
	if(!req.body.name || !req.body.email || !req.body.password)
	{
		sendJSONresponse(res,404,{
			"message":"Provide name email and password to get Register"
		})
	return;
	}
	var users=new user();
	users.name=req.body.name;
	users.email=req.body.email;
	users.setPassword(req.body.password);

	users.save(function(err){
		var token;
		if(err)
		{
			sendJSONresponse(res,404,{
				"message":err
			});
		}
		else
		{
			token=users.jsonWebTokenGenerating();
			sendJSONresponse(res, 200, {"token" : token});
		}
	});

}