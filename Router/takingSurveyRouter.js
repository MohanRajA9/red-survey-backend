import express from 'express'
import surveyModel from '../model/surveyModel.js'
const router = express.Router()

router.post('/submit/:id', async (req, res) => {
    const surveyId = req.params.id
    const { user, answers } = req.body

    try{
        const survey = await surveyModel.findById(surveyId)

        if (!survey) {
            return res.status(404).json({ message: 'survey not found' })
        }

        //push the new response to the survey's responses array
        survey.responses.push({user, answers})

        //save the updated survey with the new response
        await survey.save()

        //send a success message
        res.status(200).json({message: 'survey answers submitted successfully'})

    }catch(error){
res.send(500).json({message:'error occurred while submitting the survey'})
    }
})

export default router