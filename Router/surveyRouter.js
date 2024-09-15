import express from 'express'
import surveyModel from '../model/surveyModel.js'
const router = express.Router()

router.post('/create', async (req, res) => {
    const { title, questions, createdBy } = req.body

    try {
        const newSurvey = new surveyModel({
            title,
            questions,
            createdBy
        })
        await newSurvey.save()
        res.status(201).json(newSurvey)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})

export default router