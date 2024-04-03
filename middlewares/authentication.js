const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Update to check token from cookies
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }

        // Verify token
        const verifyUser = await jwt.verify(token, '123'); // Update to use the correct secret key

        // If verification is successful, attach the user to the request object
        console.log(verifyUser)
        req.user = verifyUser;
        next();
    } catch (error) {
        // Handle invalid token
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
