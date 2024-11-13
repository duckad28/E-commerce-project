var nodemailer =  require('nodemailer'); // khai báo sử dụng module nodemailer

module.exports.sendMail = (email, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILER_MAIL,
          pass: process.env.MAILER_PASSWORD
        }
      });
      
    var mailOptions = {
        from: process.env.MAILER_MAIL,
        to: email,
        subject: subject,
        html: text
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
