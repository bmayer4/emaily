
module.exports = (req, res, next) => {    
    if (!req.user) {
         //next() when you this middleware function is done and want to go to the next middleware
        //but we want to stop everything here if no authentication, do not call next
        return res.status(401).send({Error: 'you must log in'});
    }

   next(); 
};
  
  
