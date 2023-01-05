module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        admin_id: {
            type: Number,
            Unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    const Admins = mongoose.model("admins", schema);
    return Admins;
};