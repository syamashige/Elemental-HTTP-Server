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
            fs.readFile("./public/styles.css", "utf-8", (err, data) => {
                res.writeHead(200, { 'content-type': 'text/css' });
                // res.write(data);  //Returned an "unhandled event" - "throw"
                res.end(data)
            });
        }

        switch (req.url) {
            case "/":
                fs.readFile("./public/index.html", "utf-8", (err, data) => {
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.end(data);
                });
                break;
            case `${req.url}`:
                fs.readFile(`./public${req.url}`, "utf-8", (err, data) => {
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.end(data);
                });
                break;
            default: 
                fs.readFile("./public/404.html", "utf-8", (err, data) => {
                    res.writeHead(500, { 'content-type': 'text/html' });
                    res.end(data);
            })    
        }
     }; 
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})


        // if (req.url === "/") {
        //     fs.readFile("./public/index.html", "utf-8", (err, data) => {
        //         res.writeHead(200, { 'content-type': 'text/html' });
        //         res.end(data)
        //     });
        // } else {
        //     fs.readFile(`./public${req.url}`, "utf-8", (err, data) => {
        //         if (err) {
        //             fs.readFile("./public/404.html", "utf-8", (err, data) => {
        //                 res.writeHead(500, { 'content-type': 'text/html' });
        //                 res.end(data);
        //             });
        //         } else {
        //             res.writeHead(200, { 'content-type': 'text/html' });
        //             res.end(data)
        //         };
        //     });
        // };     