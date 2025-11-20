import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

interface sendEmailPara {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailPara) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "test@test.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>To ${
        emailType === "VERIFY" ? "verify your email " : "reset your password "
      } <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">click here</a> or copy and past the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
