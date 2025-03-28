import nodemailer from "nodemailer";
import type { Transporter, TransportOptions } from "nodemailer";

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
  to: string | string[];  // Modifié pour accepter un tableau
  subject: string;
  text: string;
  html?: string;
  attachments?: any[];
}): Promise<EmailResult> {
  // Configuration SMTP directe
  const smtpOptions: SmtpOptions = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: "noreply@dreametrix.com",
      pass: "hvre ydpz qhzc flas"
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false
    }
  };

  console.log("📧 SMTP Configuration:", smtpOptions);

  let transporter: Transporter | null = null;

  try {
    transporter = nodemailer.createTransport(smtpOptions as TransportOptions);
    await transporter.verify();
    console.log("✅ Server is ready to send emails");

    const mailOptions = {
      from: '"Radiant Prep" <noreply@dreametrix.com>',
      to: Array.isArray(data.to) ? data.to.join(', ') : data.to,
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

    console.log("🚀 Sending email to:", mailOptions.to);
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