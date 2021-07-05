const {
    verifyAccessToken,
  } = require('./utilities/tokenUtility');

//method to check the user is logged in  
const authenticateUser = (req, res, next)=>{
  
  const auth = req.headers.authorization;
  const access_token = auth.split(' ')[1];
      
  if(access_token){
    try{
      const back = verifyAccessToken(access_token);
      const {user , err} = back;
      if(err){
        if(err.name == "TokenExpiredError"){
          return res.status(403).json({
          "Message" : "Expired token"
          });
        }
  
        return res.status(403).json({
          "Message" : err.message
        });
      }
      req.user = user;
      next();
    }catch(err){
      console.log(err);
      return res.status(403).json({
        "Message" : err.message
      });
    }
  
  }else {
    return res.status(403).json({
        "Message": "No Token"
    });
  }
}
    
    module.exports = {
      authenticateUser
    }