import companion from '@uppy/companion';
import fsExtra from 'fs-extra';
import 'dotenv/config'
import path from "node:path";
import {fileURLToPath} from 'url';
import {dirname} from 'path';

fsExtra.ensureDirSync('output');
const options = {
    server: {
        host: 'my-app.com',
        protocol: 'https',
        // This MUST match the path you specify in `app.use()` below:
        path: '/s3',
    },
    secret: 'some secrety secret',
    filePath: 'output',
    providerOptions: {},
    s3: {
        bucket: process.env.COMPANION_AWS_BUCKET,
        region: process.env.COMPANION_AWS_REGION,
        key: process.env.COMPANION_AWS_KEY,
        secret: process.env.COMPANION_AWS_SECRET,
    }
};

const {app: companionApp} = companion.app(options)

companionApp.listen(8082);

companionApp.get('/', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const htmlPath = path.join(__dirname, 'public', 'index.html')
    res.sendFile(htmlPath)
})