import express from 'express'
import mongoose from 'mongoose'
import surveyRoute from './Router/surveyRouter.js'
import takingSurveyRouter from './Router/takingSurveyRouter.js' 
import resultOfSurveyRouter from './Router/resultOfSurveyRouter.js'

const app = express()
const port = 6000
const Mongo_URL = process.env.Mongo_URL
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Red Survey 6000")
})

app.use('/survey',surveyRoute)
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


