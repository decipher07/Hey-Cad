import express, { Express } from 'express'
require('dotenv').config()
import cors from 'cors'
import * as bodyParser from 'body-parser'

const app: Express = express()

require('./database/mongoose')

let sessions = require('./middlewares/sessions')
sessions(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(cors()) 
app.use('', require('./routers/auth'))
app.use('', require('./routers/calendardata')) 

app.listen(process.env.PORT, () => console.log(`Server Running on PORT 5000`))