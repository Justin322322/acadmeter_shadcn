export const getPasswordResetEmailTemplate = (
  firstName: string,
  lastName: string,
  resetLink: string
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.5;
      color: #1f2937;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      background: linear-gradient(to right, #2563eb, #7c3aed);
    }
    .logo {
      margin-bottom: 20px;
    }
    .logo img {
      height: 40px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(to right, #2563eb, #7c3aed);
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #111827;
        color: #f3f4f6;
      }
      .content {
        background-color: #1f2937;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="https://your-domain.com/logo.png" alt="AcadMeter" />
      </div>
    </div>
    
    <div class="content">
      <h1 style="margin-bottom: 16px; font-size: 24px;">Hi ${firstName} ${lastName},</h1>
      
      <p style="margin-bottom: 24px;">
        We received a request to reset your password for your AcadMeter account. 
        If you didn't make this request, you can safely ignore this email.
      </p>
      
      <p style="margin-bottom: 24px;">
        To reset your password, click the button below. This link will expire in 1 hour for security reasons.
      </p>
      
      <div style="text-align: center;">
        <a href="${resetLink}" class="button">Reset Your Password</a>
      </div>
      
      <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
        If the button doesn't work, you can copy and paste this link into your browser:
        <br>
        <a href="${resetLink}" style="color: #2563eb; word-break: break-all;">${resetLink}</a>
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} AcadMeter. All rights reserved.</p>
      <p>This email was sent to you because a password reset was requested for your account.</p>
    </div>
  </div>
</body>
</html>
`;