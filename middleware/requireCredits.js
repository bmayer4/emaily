
module.exports = (req, res, next) => {    
    if (req.user.credits < 1 ) {
        return res.status(403).send({Error: 'not enough credits'});  //w3.org has status codes
    }

   next(); 
};
  