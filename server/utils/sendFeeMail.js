const nodemailer = require('nodemailer');

const sendFeeEmail = async (student) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    const confirmYesLink = `https://avpl-assignment-backend.onrender.com/api/students/confirm?studentId=${student._id}&response=yes`;
    const confirmNoLink = `https://avpl-assignment-backend.onrender.com/api/students/confirm?studentId=${student._id}&response=no`;

    const mailOptions = {
      from: `"ERP Admin" <${process.env.EMAIL_FROM}>`,
      to: student.email,
      subject: 'Fee Submission Confirmation Required',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p>Dear <strong>${student.name}</strong>,</p>

          <p>Your updated fee due is <strong>Rs. ${student.dueAmount}</strong>.</p>
          <p>Please confirm whether you have submitted the fee:</p>

          <p>
            <a href="${confirmYesLink}" style="padding: 8px 14px; background-color: #22c55e; color: white; text-decoration: none; border-radius: 4px;">Yes, I have paid</a>
            &nbsp;&nbsp;
            <a href="${confirmNoLink}" style="padding: 8px 14px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 4px;">No, not yet</a>
          </p>

          <p>If you did not expect this message, please ignore it.</p>

          <p>Best regards,<br>ERP Admin Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${student.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendFeeEmail;
