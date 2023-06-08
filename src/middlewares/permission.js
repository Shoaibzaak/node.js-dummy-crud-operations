
function permit(allowed) {
  
  const isAllowed = role => allowed.indexOf(role) > -1;

  return (req, res, next) => {
  	
    if (req.token_decoded && isAllowed(req.token_decoded.r))
    {
      next(); // role is allowed, so continue on the next middleware
    }
    else {
      res.status(403).json({success: false, message: "Forbidden"}); // user is forbidden
    }
  }
}
module.exports = permit;
