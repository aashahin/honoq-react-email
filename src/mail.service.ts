import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { ResetPasswordEmail } from "./templates/reset-password";

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a nodemailer transporter with SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async resetPasswordEmail({
    email,
    userName,
    url,
  }: {
    email: string;
    userName: string;
    url: string;
  }) {
    try {
      // Convert React component to HTML string
      const htmlContent = await render(
        ResetPasswordEmail({
          userFirstname: userName,
          resetPasswordLink: url,
        })
      );

      // Send the email using nodemailer
      return await this.transporter.sendMail({
        from: process.env.AUTH_EMAIL_FROM,
        to: email,
        subject: "استعادة كلمة المرور",
        html: htmlContent,
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Failed to send email");
    }
  }
}
