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
            id: crypto.randomUUID(),
            message,
            author: req.body.author,
            image: req.file ? req.file.filename : null,
        }

        await messageDb.addMessage(newMessage);
        res.send(newMessage);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

messagesRouter.get('/', async (_, res, next) => {
    try {
        const messages = await messageDb.getMessages();
        res.send(messages);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

export default messagesRouter;