import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate and set user or customer data from JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) return res.status(401).json({ msg: "Token diperlukan" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    req.user = decoded; // Attach decoded token data to req.user

    // Set role based on token payload
    if (req.user.id_user) {
      req.userRole = 'user';
    } else if (req.user.id_pelanggan) {
      req.userRole = 'pelanggan';
    }

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token tidak valid" });
  }
};

