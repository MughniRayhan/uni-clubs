const admin = require("../config/firebase");

const verifyFbToken = async(req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(!authHeaders){
      return res.status(401).send({message: "unauthorized access"})
    }

    const token = authHeaders.split(' ')[1];
    if(!token){
      return res.status(401).send({message: "unauthorized access"})
    }
      try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.decoded = decodedToken;
    console.log("Decoded token:", req.decoded);
    next();
  } catch (error) {
    res.status(403).send({ message: "Forbidden access" });
  }
  }

module.exports = verifyFbToken;
