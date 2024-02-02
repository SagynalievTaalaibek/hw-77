import path from "path";
import {promises as fs} from "fs";
import {randomUUID} from "crypto";
import multer from "multer";
import config from "./config";


const imageStorage = multer.diskStorage({
    destination: async (req, file, callback) => {
        const destDir = path.join(config.publicPath, 'images');
        await fs.mkdir(destDir, {recursive: true});
        callback(null, config.publicPath);
    },
    filename(req, file, callback) {
        const extension = path.extname(file.originalname);
        const filename = path.join('images', randomUUID() + extension);
        callback(null, filename);
    },
});

export const imagesUpload = multer({storage: imageStorage});
