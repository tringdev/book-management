import { Request, Response, NextFunction } from "express";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
const passwordMinLength = 6;


const validateAuthRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): boolean => {
  const { email, password } = req.body;

  // Check if email exists
  if (!email) {
    res.status(400).json({
      success: false,
      message: "Email is required",
    });
    return false;
  }

  // Validate email format using regex
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
    return false;
  }

  // Check if password exists
  if (!password) {
    res.status(400).json({
      success: false,
      message: "Password is required",
    });
    return false;
  }

  // Validate password length
  if (password.length < passwordMinLength) {
    res.status(400).json({
      success: false,
      message: `Password must be at least ${passwordMinLength} characters`,
    });
    return false;
  }

  // Validate password complexity
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      success: false,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
    return false;
  }

  return true;
};

export const validateForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (validateAuthRequest(req, res, next)) {
    next();
  }
};

