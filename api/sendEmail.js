import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method is allowed' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'gmail',
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email design (HTML) with Good Morning wishes
    const mailOptions = {
      from: process.env.SMTP_USER, 
      to: 'sanjeetk912258@gmail.com',
      subject: 'Good Morning!',
      html: `
        <div style="background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #ff8c00; padding: 20px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-family: Arial, sans-serif;">Good Morning!</h1>
            </div>
            <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
              <h2 style="color: #333;">Wishing you a bright and productive day ahead!</h2>
              <p style="color: #666; font-size: 16px;">Here's to achieving all your goals and making today amazing. Start your day with a positive thought and a grateful heart.</p>
              <img src="https://example.com/sunrise.jpg" alt="Good Morning" style="width: 100%; border-radius: 8px;" />
              <p style="color: #333; margin-top: 20px;">Have a wonderful day!</p>
            </div>
            <div style="background-color: #ff8c00; padding: 10px; text-align: center; color: #fff; font-family: Arial, sans-serif;">
              <p style="margin: 0;">Sent with ❤️ by My App</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
