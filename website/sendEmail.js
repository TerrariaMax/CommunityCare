import nodemailer from 'nodemailer'

// Create a transporter using nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'flowingisland666@gmail.com', // Your Gmail address
    pass: 'yjzmlzsbtdmgswvp' // Your App Password (not your Gmail password)
  }
})

//Function to send an email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'flowingisland666@gmail.com', // Your Gmail address
    to: to,
    subject: subject,
    text: text
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error) // Reject the promise if there's an error
      }
      console.log('Email sent:', info.response)
      resolve(info) // Resolve the promise with the info
    })
  })
}
