import mongoose from 'mongoose'

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folder",
        default: null
    }
},
    { timestamps: true }
)

const NoteModel = mongoose.model('note', NoteSchema);

export default NoteModel;