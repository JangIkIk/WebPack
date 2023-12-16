import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url))


export default {
    target: "node",
    mode: "development",
    entry: "./src/server/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "server.cjs",
    },
    module: {
        rules:[
              {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,

              }
        ]
    },
    resolve:{
        extensions: [".js",".ts",".tsx"],
    }
} 