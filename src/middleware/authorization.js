const authAdmin = (req,res,next) => {
    console.log("checking admin authorization");
    const adminToken = 'dfdf';
    const authAdmin = adminToken === 'xyz';
    
    if(!authAdmin){
        res.status(401).send("unauthorized");
    } else {
        next();
    }
};

const userAuth = (req,res,next) => {
    console.log("checking user authorization");
    const userToken = 'rdfgffdd';
    const authUser = userToken === 'xyz';
    
    if(!authUser){
        res.status(401).send("unauthorized");
    } else {
        next();
    }
};

module.exports = {
    authAdmin,
    authUser
}