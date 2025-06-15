function SignupTemplate({ name, email }) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title>Welcome to Job Tracker</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; }
            .container {
            max-width: 600px;
            background-color: #fff;
            margin: auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            h2 { color: #1f2937; }
            p { font-size: 16px; color: #4b5563; }
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
            <p>Welcome to <strong>Job Application Tracker</strong>!</p>
            <p>Your account has been successfully created using the email <strong>${email}</strong>.</p>
            <p>You can now start tracking all your job applications in one place.</p>
            <p>Best wishes,<br />The Job Tracker Team</p>

            <div class="footer">
            This is an automated message. Please do not reply directly.
            </div>
        </div>
        </body>
        </html>
        `;
}

module.exports = { SignupTemplate };
