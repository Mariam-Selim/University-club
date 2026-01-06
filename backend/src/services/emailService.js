import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify connection
      this.transporter.verify((error) => {
        if (error) {
          logger.error('Email service configuration error:', error);
          this.transporter = null;
        } else {
          logger.info('Email service ready');
        }
      });
    } catch (error) {
      logger.error('Email service initialization error:', error);
      this.transporter = null;
    }
  }

  async sendEmail(options) {
    if (!this.transporter) {
      logger.warn('Email service not configured, skipping email send');
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@university-club.com',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      logger.info(`Email sent to ${options.to}`);
      return true;
    } catch (error) {
      logger.error('Email send error:', error);
      return false;
    }
  }

  async sendAdminRequestNotification(email, name) {
    const html = `
      <h2>New Admin Request</h2>
      <p>A new admin request has been submitted:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>
      <p>Please review and approve/reject the request in the admin panel.</p>
    `;

    return this.sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER || '',
      subject: 'New Admin Request - University Club System',
      html,
    });
  }

  async sendAdminApprovalNotification(email, name, approved) {
    const status = approved ? 'approved' : 'rejected';
    const html = `
      <h2>Admin Request ${status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      <p>Dear ${name},</p>
      <p>Your admin request has been <strong>${status}</strong>.</p>
      ${approved ? '<p>You can now log in to the admin panel.</p>' : '<p>If you have any questions, please contact the system administrator.</p>'}
    `;

    return this.sendEmail({
      to: email,
      subject: `Admin Request ${status.charAt(0).toUpperCase() + status.slice(1)} - University Club System`,
      html,
    });
  }

  async sendContactConfirmation(name, email, subject) {
    const html = `
      <h2>Thank you for contacting us!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message regarding: <strong>${subject}</strong></p>
      <p>We will get back to you as soon as possible.</p>
      <p>Best regards,<br>University Club Team</p>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Message Received - University Club System',
      html,
    });
  }
}

export default new EmailService();

