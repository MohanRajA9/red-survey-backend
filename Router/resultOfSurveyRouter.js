import express from 'express'
import surveyModel from '../model/surveyModel.js'

const router = express.Router()

//get the result of the survey
router.get('/retrieve/:id', async (req, res) => {
    const surveyId = req.params.id
    try {
        //Find the survey by its Id
        const survey = await surveyModel.findById(surveyId)

        if (!survey) {
            return res.status(404).json({ message: 'survey not found' })
        }

        //Return the survey details along with the responses
        res.json({
            title: survey.title,
            createdBy: survey.createdBy,
            questions: survey.questions,
            responses: survey.responses //this contains all the answers submitted by users 
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
})

export default router