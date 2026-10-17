import folderModel from "../models/folder.model.js";
import NoteModel from "../models/note.model.js";

const createFolder = async (req, res) => {
    const { name } = req.body

    const folder = await folderModel.create({
        name: name,
        userId: req.user.id
    })

    return res.status(201).json({
        message: "folder created successfully",
        folder
    })

}

const getFolderNotes = async (req, res) => {
    const { folderId } = req.params;

    const notes = await NoteModel.find({ folderId });

    return res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
}

const getFolders = async (req, res) => {
    const userId = req.user.id

    const folders = await folderModel.find({ userId });

    return res.status(200).json({
        message: "folders fetched successfully",
        folders
    })
}
export default { createFolder, getFolderNotes, getFolders }