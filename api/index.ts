import express from 'express';
import cors from 'cors';
import {messageDb} from "./messageDb";
import messagesRouter from "./routes/messages";


const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/message', messagesRouter);

const run = async () => {
    await messageDb.init();
    app.listen(port, () => {
        console.log(`Server listen on ${port} port!`);
    });
};

void run();