const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // console.log(req);
  // console.log(req.headers.authorization);

  try {
    // Verify user authentication using the token in the request headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Get the token part after "Bearer "
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const userId = decodedToken.userId; // will extract the user ID from the token
    req.body.userId = userId;
    next();
  } catch (error) {
    console.log("failed in authorization");

    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
