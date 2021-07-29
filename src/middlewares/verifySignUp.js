const dbConn = require("../config/db.config");
 
checkDuplicateUsernameOrEmail = (req, res, next) => {
   
     dbConn.query("Select * from users where email LIKE ?", req.body.email, function (errr, ress) {
        if(errr) {
            console.log("error: ", res);
            next(errr,null);
        }
        else{
            if (ress && ress > 0) {
                res.status(400).send({
                message: "Failed! Username is already in use!" 
            });
            //next(errr,null);
            }
            else{
            //next();
            }next();
        }
    }); 
};
 

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;