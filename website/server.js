import express from 'express'
import cors from 'cors' // Import the cors package
import { sendEmail } from './sendEmail.js'

const app = express()
// const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors()) // Use the CORS middleware
app.use(express.json()) // Parse JSON in requests

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body

  try {
    const info = await sendEmail(to, subject, text) // Call the sendEmail function
    res.status(200).send({ message: 'Email sent successfully', info })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send({ message: 'Failed to send email', error })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// import express from 'express'
// import { sendEmail } from './sendEmail.js'

// const app = express()
// const port = process.env.PORT || 3000

// app.use(express.json()) // Add this line to parse JSON in requests

// // const port = 3000
// app.get('/', (req, res) => {
//   res.send('Hello from Node.js!')
// })

// app.post('/send-email', async (req, res) => {
//   const { to, subject, text } = req.body

//   try {
//     const info = await sendEmail(to, subject, text) // Call the sendEmail function
//     res.status(200).send({ message: 'Email sent successfully', info })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     res.status(500).send({ message: 'Failed to send email', error })
//   }
// })

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })
