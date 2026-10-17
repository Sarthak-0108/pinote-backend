import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
},
    { timestamps: true }
)

const folderModel = mongoose.model('folder', folderSchema);

export default folderModel;