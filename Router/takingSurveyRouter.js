import express from 'express'
import { auth } from '../middleware/auth.js'
import surveyModel from '../model/surveyModel.js'
const router = express.Router()

router.post('/submit/:id', auth, async (req, res) => {
    const surveyId = req.params.id
    const { username } = req.user
    const { user, answers } = req.body

    try {
        const survey = await surveyModel.findById(surveyId)

        if (!survey) {
            return res.status(404).json({ message: 'survey not found' })
        }

        //push the new response to the survey's responses array
        survey.responses.push({ user:username, answers })

        //save the updated survey with the new response
        await survey.save()

        //send a success message
        res.status(200).json({ message: 'survey answers submitted successfully' })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
})

export default router