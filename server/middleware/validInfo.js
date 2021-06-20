module.exports = function(req, res, next) {
  const { name, email, password, password2 } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  //validation of information provided at sign up
  if (req.path === "/signup")
  {
    console.log(!email.length);
    if (![name, email, password, password2].every(Boolean))
    {
      return res.json("All fields are required.");
    }
    else if (!validEmail(email))
    {
      return res.json("This email is invalid.");
    }
    else if (password !== password2)
    {
      return res.json("The passwords do not match.");
    }
  } 

  //validation of information provided at sign in
  else if (req.path === "/signin")
  {
    if (![name, password].every(Boolean))
    {
      return res.json("All fields are required.");
    } 
  }

  next();
};