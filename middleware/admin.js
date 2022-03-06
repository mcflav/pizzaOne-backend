module.exports = function(req,res,next){
    if (!req.user.isAdmin) return res.status(403).status('Access is denied.');
    
    next();    
};