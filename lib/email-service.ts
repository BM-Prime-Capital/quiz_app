import nodemailer from "nodemailer"

export interface EmailData {
  to: string
  subject: string
  text: string
  html?: string
  attachments?: Array<{
    filename: string
    content: Buffer | Blob
    contentType: string
  }>
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; previewUrl?: string }> {
  try {
    // Créer un compte de test Ethereal
    const testAccount = await nodemailer.createTestAccount()
    console.log("Test account created:", testAccount)

    // Créer un transporteur avec les informations du compte de test
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    // Convertir le contenu Blob en Buffer si nécessaire
    const attachments = data.attachments
      ? await Promise.all(
          data.attachments.map(async (attachment) => {
            if (attachment.content instanceof Blob) {
              const buffer = Buffer.from(await attachment.content.arrayBuffer())
              return {
                ...attachment,
                content: buffer,
              }
            }
            return attachment
          }),
        )
      : []
      // Envoyer l'email
      const info = await transporter.sendMail({
        from: '"Radiant Prep" <test@radiantprep.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html || data.text,
        attachments: attachments as Array<{
          filename: string
          content: Buffer
          contentType: string
        }>,
      })

      if (info) {
        console.log("Message sent: %s", info.messageId)

        // URL de prévisualisation de l'email (spécifique à Ethereal)
        const previewUrl = nodemailer.getTestMessageUrl(info)
        console.log("Preview URL: %s", previewUrl)

        return {
          success: true,
          previewUrl: previewUrl as string,
        }
      }

      return { success: false }
    } catch (error) {
      console.error("Error sending email:", error)
      return { success: false }
    }
  }
