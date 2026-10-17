import NoteModel from "../models/note.model.js";

const createNote = async (req, res) => {
    const { title, content, folderId } = req.body

    const note = await NoteModel.create({
        title,
        content,
        userId: req.user.id,
        folderId: folderId
    })

    return res.status(201).json({
        message: "note created successfully",
        note
    })
}

const updateNote = async (req, res) => {
    const { title, content } = req.body;
    const { noteId } = req.params;
    const userId = req.user.id


    const noteToUpdate = await NoteModel.findOne({ _id: noteId });

    if (noteToUpdate.userId.toString() !== userId) {
        return res.status(401).json({
            message: "unathourised access"
        })
    }

    const updatedNote = await NoteModel.findOneAndUpdate({
        _id: noteId
    }, {
        $set: {
            title: title,
            content: content
        }
    },
        { new: true })

    return res.status(200).json({
        message: "note updated successfully",
        updatedNote
    })
}

export default { createNote, updateNote };