import express, {Request, Response} from 'express';
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../client/App";
import fs from "fs";

const app = express();
const port = 3001;
const reactHtml = async (url: string)=>{
    const reactApp = ReactDOMServer.renderToString(
        <StaticRouter location={url}>
            <App/>
        </StaticRouter>
    )
    const html = await fs.promises.readFile(`${__dirname}/index.html`, "utf-8");
    const reactHtml = html.replace(
        '<div id="root"></div>',`<div id="root">${reactApp}</div>`
    )


    return reactHtml;
}


app.get("*", async(req: Request, res: Response)=>{
    
    const indexHtml =  await reactHtml(req.url)
    res.send(indexHtml)
})


app.listen(port, ()=>{
    console.log(`server Start ${port}`)
})
