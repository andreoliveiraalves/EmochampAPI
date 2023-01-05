module.exports = (mongoose) => {
    const schema = mongoose.Schema({
            emotion_id: {
                type: Number,
                Unique: true
            },
            name: {
                type: String
            },
            pictures: {
                type: Array
            }
        }

    );
    
    // creates a new model Tutorial using the defined schema above
    const Emotions = mongoose.model("emotions", schema);
    return Emotions;
};