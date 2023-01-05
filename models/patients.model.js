module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        patient_id: {
            type: Number,
            Unique: true
        },

        name: {
            type: String,
            required: [true, 'Please a valide username']
        },

        description: {
            type: String,
            required: [false]
        },

        email: {
            type: String,
            required: [true, 'Please a valid email']
        },

        password: {
            type: String,
            required: [true, 'Please a valid password']
        },

        avatar: {
            type: String,
            required: [false]
        },

        emotionsgame1: [{
            emotion_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "emotions"
            },
            right_answers: {
                type: Number,
                default: 0
            },
            wrong_answers: {
                type: Number,
                default: 0
            }
        }],

        emotionsgame2: [{
            emotion_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "emotions"
            },
            right_answers: {
                type: Number,
                default: 0
            },
            wrong_answers: {
                type: Number,
                default: 0
            }
        }]
    });
    const Patients = mongoose.model("patients", schema);
    return Patients;
};