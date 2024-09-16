import express from 'express'
import mongoose from 'mongoose'
import createSurveyRoute from './Router/surveyRouter.js'
import takingSurveyRouter from './Router/takingSurveyRouter.js' 
import resultOfSurveyRouter from './Router/resultOfSurveyRouter.js'
import surveyLoginRouter from './Router/surveyLoginRouter.js'
import { auth } from './middleware/auth.js'

const app = express()
const port = process.env.port
const Mongo_URL = process.env.Mongo_URL


app.use(express.json())

app.get('/', (req, res) => {
    res.send("Red Survey 6000")
})

app.use('/survey-login',surveyLoginRouter)
app.use('/create-survey',createSurveyRoute)
app.use('/taking-survey',takingSurveyRouter)
app.use('/result-survey',resultOfSurveyRouter)

mongoose.connect(Mongo_URL)
    .then(() => {
        console.log("Mongo DB connected")
        app.listen(port, () => console.log(`server started at the port ${port}`))
    })
    .catch((error)=>{
        console.log("Error",error)
    })


