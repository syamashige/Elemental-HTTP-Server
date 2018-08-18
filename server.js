const http = require("http");
const fs = require("fs");

// SET PORT                                             // IF env is defined - it will save to PORT
const PORT = process.env.PORT || 8080;                  // IF env is undefined - it will default to PORT 8080 
    // console.log("process.env", process.env);            // All info about the environment
    // console.log("process.env.PORT", process.env.PORT);  // PORT is undefined 

// CREATE SERVER 
const server = http.createServer((req, res) => {        
    // console.log("req", req);                            
    // console.log("req.headers", req.headers);            
    // console.log("req.method", req.method);              // Method - returns either 'GET' or 'POST'
    // console.log("req.url", req.url);                    // Url - returns '/'

    // POST METHOD 
    // if (req.method === "POST") {
    //     // Post Conditionals Here
    // };

    // GET METHOD
    if (req.method === "GET") {
        if (req.url === "/styles.css") {
            fs.readFile('./public/styles.css', 'utf-8', (err, data) => {
                if (err) throw err;
                res.writeHead(200, { 'content-type': 'text/css' });
                res.write(data);
                res.end();
            });
        };

        switch (req.url) {
            case "/":
                fs.readFile('./public/index.html', 'utf-8', (err, data) => {
                    console.log("index data", data)
                    console.log("index.url", req.url)
                    if (err) throw err;
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.write(data);
                    res.end();
                });
                // break;
            case "/helium":
                fs.readFile('./public/helium.html', 'utf-8', (err, data) => {
                    console.log("helium data", data)
                    if (err) throw err;
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.write(data);
                    res.end();
                });
                break;
            // case `${req.url}`:
            //     fs.readFile(`./public${req.url}.html`, 'utf-8', (err, data) => {
            //         console.log("req.url", `${req.url}`)
            //         if (err) throw err;
            //         res.writeHead(200, { 'content-type': 'text/html' });
            //         res.write(data);
            //         // res.end();
            //     });
            //     break;
            // case '/styles.css':
            //     fs.readFile('./public/styles.css', 'utf-8', (err, data) => {
            //         if (err) throw err;
            //         res.writeHead(200, { 'content-type': 'text/css' });
            //         res.end();
            //     });
                // break;
            default:
                fs.readFile('./public/404.html', 'utf-8', (err, data) => {
                    if (err) throw err;
                    res.writeHead(500, { 'content-type': 'text/html' });
                    res.write(data);
                    res.end();
                });    
        };
        // if (req.url === "/styles.css") {
        //     fs.readFile('./public/styles.css', 'utf-8', (err, data) => {
        //         if (err) throw err;
        //         res.writeHead(200, { 'content-type': 'text/css' });
        //         res.write(data);
        //         res.end();
        //     });
        // };
    } 
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})



        // if(req.url === "/") {                                                 // If the url is "/"
        //     fs.readFile("./public/index.html", 'utf-8', (err, data) => {      // Read the content in index.html
        //         console.log("Index Data", data.toString());
        //         if (err) throw err;                                            // If there's an error, throw an error
        //         console.log("index data", data);

        //         res.writeHead(200, { "content-type": "text/html" });    // 200 means the request has succeded 
        //         // res.write(data);                                        // 
        //         res.end(data);
        //     });
        // }
        // if (req.url === "/helium.html") {
        //     fs.readFile(`./public/helium.html`, 'utf-8', (err, data) => {
        //         if (err) throw err;
        //         console.log("Helium Data", data);

        //         res.writeHead(200);
        //         res.write(data);
        //         res.end();
        //     });
        // }
        // if (req.url === "/hydrogen.html") {
        //     fs.readFile("./public/hydrogen.html", 'utf-8', (err, data) => {
        //         if (err) throw err;
        //         console.log("Hydrogen Data", data);

        //         res.writeHead(200, { "Content-Type": "text/html" });
        //         res.write(data);
        //         res.end();
        //     });
        // }

        // if (req.url === '/styles.css') {
        //     fs.readFile('./public/styles.css', 'utf-8', (err, data) => {
        //         if (err) throw err;
        //         console.log("Making Everything Pretty!")
        //         res.writeHead(200, { 'content-type': 'text/css' });
        //         res.write(data);
        //         res.end();
        //     });
        // };

                
        // fs.readFile('./public/404.html', "utf-8", (err, data) => {
        //     if (err) throw err;
        //     console.log("Error Data", data);
        //     res.writeHead(500, { 'content-type': 'text/html' });
        //     res.write(data);
        //     res.end();
        // }); 