var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'reed.mcalpin@gmail.com',
    pass: '********'
  }
});

var mailOptions = {
  from: 'reed.mcalpin@gmail.com',
  to: 'stuart.mcalpin@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});