const express = require ('express')
const cors = require ('cors')
const morgan = require ('morgan')
const dotenv = require ('dotenv')
const colors = require ('colors')

// Config dot env file
dotenv.config()

// rest object
const app = express()

// Middlewares
app.use (morgan('dev'))
app.use (express.json())
app.use(cors())

// Routes
app.get ('/', (req, res) => {
    res.send ('<h1>Hello from Server</h1>')
})

// Port
const PORT = 8080 || process.env.PORT

// Listen Server
app.listen (PORT, () => {
    console.log (`Server running on port ${PORT}`)
})