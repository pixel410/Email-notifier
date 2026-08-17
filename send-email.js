const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const recipientEmail = process.env.RECIPIENT_EMAIL;
const recipientName = process.env.RECIPIENT_NAME || 'Valued Customer';
const trackingCode = process.env.TRACKING_CODE;
const trackingUrl = process.env.TRACKING_URL || '#';
const estimatedDelivery = process.env.ESTIMATED_DELIVERY || 'Pending';

const mailOptions = {
  from: `"Delivery Service" <${process.env.EMAIL_USER}>`,
  to: recipientEmail,
  subject: `Your Package is On Its Way! (Tracking ID: ${trackingCode})`,
  html: `
    
      Shipment Confirmation
      Hello ${recipientName},
      Your package has been dispatched and is currently on its way to you.
      
      
        Tracking Code: ${trackingCode}
        Estimated Delivery: ${estimatedDelivery}
      

      
        Track Your Package
      

      Thank you for choosing our delivery service!
    
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  }
  console.log('Email sent successfully:', info.response);
});
