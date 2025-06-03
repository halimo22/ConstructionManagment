import mailgun from 'mailgun-js';
import dotenv from 'dotenv';

dotenv.config(); // Make sure env variables are loaded

export async function sendEmail(to: string, subject: string, html: string) {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY!,
    domain: process.env.MAILGUN_DOMAIN!,
  });

  const data = {
    from: `WE-BUILD <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    html,
  };

  return mg.messages().send(data);
}
