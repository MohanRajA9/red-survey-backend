import mongoose from 'mongoose'

const surveySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [
        {
            questionText: { type: String, required: true },
        }
    ],
    responses: [
        {
            user: { type: String, required: true },
            answers: [
                {
                    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
                    answer: { type: String, enum: ['yes', 'no'], required: true }
                }
            ]
        }
    ],
    createdBy: { type: String, required: true }
})

const surveyModel = mongoose.model('Survey', surveySchema);

export default surveyModel