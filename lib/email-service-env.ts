import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type { Transporter, TransportOptions } from "nodemailer";

dotenv.config(); // Charge les variables d'environnement

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface SmtpOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    minVersion?: string;
    rejectUnauthorized?: boolean;
  };
}

export async function sendEmail(data: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: any[];
}): Promise<EmailResult> {
  const requiredEnvVars = [
    "MAIL_HOST",
    "MAIL_PORT",
    "MAIL_USERNAME",
    "MAIL_PASSWORD",
    "MAIL_FROM_ADDRESS"
  ];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    const error = `❌ Missing required email configuration: ${missingVars.join(", ")}`;
    console.error(error);
    return { success: false, error };
  }
  // Configuration SMTP
  const smtpOptions: SmtpOptions = {
    host: process.env.MAIL_HOST!,
    port: parseInt(process.env.MAIL_PORT || "587"),
    secure: process.env.MAIL_ENCRYPTION === "ssl", // `true` si SSL, `false` pour STARTTLS
    auth: {
      user: process.env.MAIL_USERNAME!,
      pass: process.env.MAIL_PASSWORD!
    },
    tls: process.env.MAIL_ENCRYPTION === "tls" ? {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false // Peut être mis à `true` si l'autorité de certification est fiable
    } : undefined
  };

  console.log("📧 SMTP Configuration:", {
    host: smtpOptions.host,
    port: smtpOptions.port,
    secure: smtpOptions.secure
  });

  let transporter: Transporter | null = null;

  try {
    transporter = nodemailer.createTransport(smtpOptions as TransportOptions);
    await transporter.verify();
    console.log("✅ Server is ready to send emails");

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || "Radiant Prep"}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html || data.text,
      attachments: data.attachments?.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content,
        encoding: "base64",
        contentType: attachment.contentType
      }))
    };

    console.log("🚀 Sending email to:", data.to);
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Email sending failed:", errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    if (transporter) {
      try {
        transporter.close();
      } catch (closeError) {
        console.error("⚠️ Error closing transporter:", closeError);
      }
    }
  }
}
