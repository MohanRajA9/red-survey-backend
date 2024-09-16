import express from 'express'
import { auth } from '../middleware/auth.js'
import surveyModel from '../model/surveyModel.js'
const router = express.Router()

router.post('/create', auth, async (req, res) => {
    const { title, questions } = req.body
    const { username } = req.user

    //validate request body
    if (!title || !questions || !Array.isArray(questions)){
        return res.status(400).json({message:"invalid input data"})
    }

    try {
        const newSurvey = new surveyModel({
            title,
            questions,
            createdBy : username
        })
        await newSurvey.save()
        res.status(201).json(newSurvey)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})

export default router