import { transporter } from "../config/nodemailerConfig"

export const sendVerificationResultMail = async (
  toEmail: string,
  name: string,
  status: string,
  reason?: string
) => {
  let subject = ''
  let html = ''

  if (status === 'approve') {
    subject = 'Your Lawyer Profile Has Been Approved'
    html = `
      <h3>Hello ${name},</h3>
      <p>Congratulations! Your lawyer profile has been <strong>approved</strong>.</p>
      <p>You can now log in and start using your account.</p>
      <br/>
      <p>Regards,<br/>Legal Consultation Team</p>
    `
  } else {
    subject = 'Your Lawyer Profile Has Been Rejected'
    html = `
      <h3>Hello ${name},</h3>
      <p>We regret to inform you that your lawyer profile has been <strong>rejected</strong>.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
      <p>If you believe this is a mistake or want to reapply, please contact our support.</p>
      <br/>
      <p>Regards,<br/>Legal Consultation Team</p>
    `
  }

  try {
    await transporter.sendMail({
      from: "Legal Platform",
      to: toEmail,
      subject,
      html
    })
    console.log(`${status} email sent to ${toEmail}`)
  } catch (err) {
    console.error("Failed to send email:", err)
  }
}
