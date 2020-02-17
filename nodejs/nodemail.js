const nodemailer = require("nodemailer");

module.exports = function(msgTo, textMsg, htmlMsg, msgSubject){

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: process.env.MAIL_SERVER_NAME,
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_LOGIN, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    },
    debug: true
  });

  console.log("message inputs");
  console.log(msgTo, textMsg, htmlMsg, msgSubject);
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.RETURN_ADDRESS, // sender address
    to: msgTo, // list of receivers
    subject: msgSubject, // Subject line
    text: textMsg, // plain text body
    html: htmlMsg // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

};
