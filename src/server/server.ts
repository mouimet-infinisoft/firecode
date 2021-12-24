import { createServer } from "http";
import { createFsFromVolume, Volume } from 'memfs';
import { webpack } from "webpack";
import { serverWebpackConfig } from "./server.webpack.config";


    createServer({}, (req, res) => {
        req.on("data", (chunk) => {
            console.log(`Data chunk available: ${chunk}`);
            const {file, out }= JSON.parse(chunk.toString());

            compile(file, out).then((result) => {
                res.writeHead(200);
                res.end(Buffer.from(JSON.stringify(result)));
            });
        });
        req.on("end", () => {
            //end of data
        });
    })
    .listen(8000);

const compile = (file, out) =>
    new Promise((resolve, reject) => {
        //@ts-ignore
        const compiler = webpack(serverWebpackConfig(file, out));
        const fs = createFsFromVolume(new Volume());
        compiler.outputFileSystem=fs;
        return compiler.run((err, stats) => {
            const component = fs.readFileSync(`/${out}`)
            resolve({
                result: stats.toString(),
                component
            });
        });
    });