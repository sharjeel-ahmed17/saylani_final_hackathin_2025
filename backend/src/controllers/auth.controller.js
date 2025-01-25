import { UserModel } from '../modals/user.modal.js'
import { sendRepsonse } from '../helpers/sendResponse.js'
import bcrypt from 'bcrypt'
import { generateTokens } from '../utils/token.js'
import { generateOTP } from '../helpers/generateOtp.js'
import { envConfig } from '../lib/configs/env.config.js'
import nodemailer from 'nodemailer'
// Mock database
const RegisterController = async (req, res) => {
  try {
    // Get values
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const findUser = await UserModel.findOne({ email });
    if (findUser)
      return sendRepsonse(res, 409, true, "User already exists", null);

    // Encrypt Password
    const encyptPass = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = generateOTP();

       const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    // Save user to the database
    const user = new UserModel({ fullname, email, password: encyptPass, otp,otpExpiresAt, });
    await user.save();

    // Send OTP email
    try {
      await sendEmailWithOtp(email, otp);
      return sendRepsonse(
        res,
        201,
        false,
        "User registered. OTP sent to email.",
        user
      );
    } catch (emailError) {
      // Rollback user creation if email sending fails
      await UserModel.findByIdAndDelete(user._id);
      return sendRepsonse(res, 500, true, "Failed to send OTP email", null);
    }
  } catch (error) {
    return sendRepsonse(res, 500, true, error.message, null);
  }
};



export const sendEmailWithOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: envConfig.EMAIL_HOST, // Use environment variables
    port: envConfig.EMAIL_PORT,
      secure: true, // true for port 465, false for port 587
    // service:"gmail",
    auth: {
      user: envConfig.EMAIL_USER,
      pass: envConfig.EMAIL_PASS,
    },
  });

 const message = {
    from: envConfig.EMAIL_USER, // Sender address
    to: email, // Recipient address
    subject: "Welcome to Hackathon Website!", // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2>Welcome to Hackathon Website!</h2>
        <p>Dear User,</p>
        <p>Thank you for registering on our platform. Please use the following OTP to complete your registration:</p>
        <h3 style="background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">
          ${otp}
        </h3>
        <p>If you did not register, please ignore this email.</p>
        <p>Best regards,<br>Hackathon Website Team</p>
      </div>
    `, // HTML body
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Email sent:", info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export const VerfiyEmailController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
          // Find the user by email
        const findUser = await UserModel.findOne({ email });
        if (!findUser) return sendRepsonse(res, 401, true, "User not found", null);

        //logic to request again token if expired
        if (!otp) {
            const newOtp = generateOTP(); // Generate a new OTP
            findUser.otp = newOtp
            findUser.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
            await findUser.save()
             return sendRepsonse(
            res,
            200,
            false,
            "OTP verified successfully",
            null
        );
        }

        // Check if OTP matches and is not expired
        if (findUser.otp !== otp)  return sendRepsonse(res, 400, true, "Invalid OTP", null); 
            
        // check token expire time
         if (findUser.otpExpiresAt < Date.now()) 
            return sendRepsonse(res, 400, true, "OTP has expired", null);
        
        // OTP is valid, clear OTP fields (optional)
        findUser.otp = undefined;
        findUser.otpExpiresAt = undefined;
        await findUser.save();
        return sendRepsonse(res, 200, false, "OTP verified successfully", null);
        
        
    } catch (error) {
        return sendRepsonse(res, 500, true, error.message, null);
        
    }
}




const LoginController = async (req, res) => {
    try {
        // get user data
        const { email, password } = req.body
        
        //find user
        const user = await UserModel.findOne({ email }).lean()
        if (!user) return sendRepsonse(res,401,true,"User not Registered",null)
        
        // decrypt password to check password
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {return sendRepsonse(res, 401, true, "Invalid Credentials", null)}
        
        
        //create token when user find and send data in token
        const { generateAccessToken} = generateTokens(user)
        // res.cookie('refreshToken', {
        //     httpOnly: true,      // Secure the cookie from JavaScript
        //     secure: true,        // Ensure cookie is sent over HTTPS
        // })
        
        return sendRepsonse(res,201,false,'User Login Successfully!',{generateAccessToken,name:user.name,email})
        
    } catch (error) {
        return sendRepsonse(res, 500, true, error.message,null)
    }
     
    
}


export {RegisterController,LoginController}

