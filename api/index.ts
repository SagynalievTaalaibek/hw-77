import express from 'express';
import cors from 'cors';


const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server listen on ${port} port!`);
});