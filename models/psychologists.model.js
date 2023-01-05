module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        psychologist_id: {
            type: Number,
            Unique: true
        },

        name: {
            type: String,
            required: [true, 'Please a valid username']
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

        patients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "patients"
        }]
    }, {
        timestamps: false
    });

    const Psychologists = mongoose.model("psychologists", schema);
    return Psychologists;
};