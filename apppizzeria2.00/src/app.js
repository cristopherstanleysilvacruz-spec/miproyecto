const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const routes = require('./routes')

const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api', routes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente')
})

module.exports = app
