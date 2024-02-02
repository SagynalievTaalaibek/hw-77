import express from 'express';
import {Message} from "../types";
import {messageDb} from "../messageDb";
import {imagesUpload} from "../multer";

const messagesRouter = express.Router();


messagesRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(422).send({error: "Message must be present in the request!"});
        }

        const newMessage: Message = {
            message,
            author: req.body.author,
            image: req.file ? req.file.filename : null,
        }

        await messageDb.addMessage(newMessage);
        res.send(newMessage);
    } catch (e) {
        next(e);
    }
});

export default messagesRouter;