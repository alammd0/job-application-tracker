function JobRemoveEmailTemplate({ name, jobRole, company }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Job Removed Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9fafb;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background-color: #ffffff;
          margin: auto;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h2 {
          color: #b91c1c;
        }
        p {
          font-size: 16px;
          color: #4b5563;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Hello ${name},</h2>
        <p>
          This is to inform you that the job role <strong>${jobRole}</strong> at
          <strong>${company}</strong> has been successfully removed from your Job Tracker.
        </p>
        <p>
          You can continue managing your applications and add new ones anytime.
        </p>
        <p>
          Best regards,<br />
          The Job Tracker Team
        </p>

        <div class="footer">
          This is an automated email. Please do not reply directly.
        </div>
      </div>
    </body>
  </html>
  `;
}


module.exports = { JobRemoveEmailTemplate }