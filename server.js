const forceSSL = require("express-force-ssl");
const express = require("express")();
const https = require("https");
const http = require("http");
const next = require("next");
const path = require("path");
const fs = require("fs");

process.env.DO_LOG = Boolean(process.env.npm_config_do_log);
process.env.NODE_ENV = process.env.npm_config_dev ? "development" : "production";

const dev = process.env.NODE_ENV !== "production";
const nextjs = next({ dev });
const nextHandler = nextjs.getRequestHandler();

// const HTTPS_PORT = process.env.HTTPS_PORT || 3001;
const HTTP_PORT = process.env.HTTP_PORT || 3000;

async function tryer(name, middleware, req, res, next) {
    try { await middleware(req, res, next) }
    catch(e) { console.error(`----> ${name} error`, e, new Error().stack) }
}

async function handleImage(req, res, next) {
    try {
        const parsedUrl = req.baseUrl.split("/").slice(1); // split and remove first empty
        const parsedPath = parsedUrl.slice(0, -1); // get only path
        const fileName = parsedUrl.slice(-1)[0]; // get only file name

        async function tryExtension(parsedPath, folderName, fileName, extension) {
            const relativePath = path.join(...parsedPath, folderName, `${fileName}.${extension}`);
            
            try {
                const dynamicPath = path.join(process.cwd(), relativePath);
                await fs.promises.access(dynamicPath);
                return dynamicPath;
            } catch(e) {}

            try {
                const staticPath = path.join(process.cwd(), "public", relativePath);
                await fs.promises.access(staticPath);
                return staticPath;
            } catch(e) {}
        }
        
        if(req.headers.accept.includes("image/webp")) {
            const result = await tryExtension(parsedPath, "webp", fileName, "webp");
            if(result) return res.sendFile(result);
        } else {
            const pngResult = await tryExtension(parsedPath, "png", fileName, "png");
            if(pngResult) return res.sendFile(pngResult);

            const jpgResult = await tryExtension(parsedPath, "jpg", fileName, "jpg");
            if(jpgResult) return res.sendFile(jpgResult);
        }

        throw new Error();
    } catch(e) { next() }
}

(async () => {
    try {
        await nextjs.prepare();

        // https.createServer({
        //     cert: fs.readFileSync("SSL/cert.pem"),
        //     key: fs.readFileSync("SSL/key.pem")
        // }, express).listen(HTTPS_PORT);
        http.createServer(express).listen(HTTP_PORT);
        
        express.use(async (...args) => await tryer("forceSSL", forceSSL, ...args));
        
        express.use("/images/*", async (...args) => await tryer("image handler", handleImage, ...args));
        
        express.all("/api/*", async (...args) => await tryer("next api", nextHandler, ...args));
        express.get("*", async (...args) => await tryer("next main", nextHandler, ...args));

        console.log(`--> Process environment: '${process.env.NODE_ENV}'`);
        console.log(`--> Is app in development mode: ${dev}`);
        console.log(`-> Ready on port ${HTTP_PORT} for HTTP`);
        console.log(`-> Ready on port ${HTTPS_PORT} for HTTPS`);
	} catch(e) {
		console.error(e.stack);
		process.exit(1);
	}
})();