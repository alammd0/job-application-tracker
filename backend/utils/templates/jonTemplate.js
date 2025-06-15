function JobgenerateEmailTemplate({name, jobRole, actionType, note, company, status}) {
  return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <title>Job Application Notification</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            padding: 20px;
            }
            .container {
            max-width: 600px;
            background-color: #ffffff;
            padding: 30px;
            margin: auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            h2 {
            color: #1f2937;
            }
            p {
            font-size: 16px;
            color: #4b5563;
            }
            .status-box {
            background-color: #e0f2fe;
            color: #0369a1;
            font-weight: bold;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
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
            <p>This is to inform you that your job application for the position of <strong> ${jobRole}</strong> at <strong> ${company} </strong> has been <strong> ${actionType} </strong>.</p>

           
            <div class="status-box">
            Current Status: ${status}
            </div>
          
            <p><strong>Note:</strong> ${note}</p>
            

            <p>If this was not intended or if you have any questions, please contact us.</p>

            <p>Best regards,<br />Job Application Tracker Team</p>

            <div class="footer">
            This is an automated message. Please do not reply directly.
            </div>
        </div>
        </body>
        </html>
    `;
}

module.exports = { JobgenerateEmailTemplate };