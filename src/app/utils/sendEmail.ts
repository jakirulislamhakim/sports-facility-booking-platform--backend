import nodemailer from 'nodemailer';
import config from '../config';
import { TUserSendMessage } from '../modules/userFeedback/userFeedback.interface';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL_ADDRESS,
    pass: config.GMAIL_APP_PASS,
  },
});

const adminEmailTemplate = (payload: TUserSendMessage) => {
  const { email, message, name, subject } = payload;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px;">
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #1a73e8;">
            <h1 style="color: #ffffff; margin: 0;">New Contact Form Submission</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <h2 style="color: #333333; margin-bottom: 20px;">Contact Details:</h2>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="padding: 10px; background-color: #f8f9fa;">
                  <strong>Name:</strong> ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px;">
                  <strong>Email:</strong> ${email}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f8f9fa;">
                  <strong>Subject:</strong> ${subject}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px;">
                  <strong>Message:</strong><br>
                  <p style="margin-top: 5px; line-height: 1.6;">${message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #666666;">
            <p style="margin: 0;">This message was sent from your website's contact form.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const userEmailTemplate = (payload: TUserSendMessage) => {
  const { name, subject } = payload;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px;">
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #1a73e8;">
            <h1 style="color: #ffffff; margin: 0;">Thank You for Contacting Us!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <h2 style="color: #333333;">Dear ${name},</h2>
            <p style="color: #666666; line-height: 1.6;">Thank you for reaching out to us regarding "${subject}". We have received your message and want to let you know that it's in good hands.</p>
            <p style="color: #666666; line-height: 1.6;">Our team will review your message and get back to you as soon as possible. We typically respond within 24-48 hours during business days.</p>
           
            <p style="color: #666666; line-height: 1.6;">If you have any additional questions or concerns, please don't hesitate to reach out to us again.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #666666;">
            <p style="margin: 0;">Best regards,<br>Jakirul Islam Hakim</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const sendEmail = async (payload: TUserSendMessage) => {
  try {
    const adminMailOptions = {
      from: payload.email,
      to: config.GMAIL_ADDRESS,
      subject: payload.subject,
      html: adminEmailTemplate(payload),
    };

    const userMailOptions = {
      from: config.GMAIL_ADDRESS,
      to: payload.email,
      subject: `Re: ${payload.subject}`,
      html: userEmailTemplate(payload),
    };

    // send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw Error('Failed to send message! Please try again');
  }
};

export default sendEmail;
