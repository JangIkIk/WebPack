import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url))


export default {
    target: "web",
    mode: "development",
    entry: "./src/client/index.tsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "client.js",
    },
    devServer:{
        open: false,
        hot: true,
        port: 3000,
        historyApiFallback: true,
        liveReload: true
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
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/client/index.html`
        }),
        new ForkTsCheckerWebpackPlugin(),

    ],
    resolve:{
        extensions: [".js",".ts",".tsx"],
    }

}