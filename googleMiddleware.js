require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

//method to verify "Login with google" is done correctly
const verify = async(req,res,next)=> {

  const auth = req.headers.authorization;
  const info = req.headers.info;
  try{
  let user;
  if(auth){  
    const token = auth.split(' ')[1]; 
  const ticket = await client.verifyIdToken({//verify user by verify idToken
      
      idToken: token,
      audience: CLIENT_ID,
  })
  const payload = ticket.getPayload();//get user google account info
  const name = payload.given_name + ' ' + payload.family_name;
  const email = payload.email;
  console.log(payload);
  user = {
    name,
    email
}
    }
    else {
      const fname = info.split(' ')[0];
      const lname = info.split(' ')[1];
      const emailAdd = info.split(' ')[2];
      const name = fname + " " + lname;
      const email = emailAdd;
      user = {
        name,
        email
    }
    }
  

  console.log(user);
  req.user = user;
  next();//the user is verified, continue the required operation
  }catch(err){
    console.log(err);
    res.status(403).json({
        "Message" : err.message
    })
  }

}

module.exports = verify;


