const http = require("http");
const fs = require("fs");
const qs = require("querystring");

// SET PORT                                                // IF env is defined - it will save to PORT
const PORT = process.env.PORT || 8080;                     // IF env is undefined - it will default to PORT 8080 
    // console.log("process.env", process.env);            // All info about the environment
    // console.log("process.env.PORT", process.env.PORT);  // PORT is undefined 

// CREATE SERVER 
const server = http.createServer((req, res) => {        
    // console.log("req", req);                            
    // console.log("req.headers", req.headers);            
    // console.log("req.method", req.method);              // Method - returns either 'GET' or 'POST'
    // console.log("req.url", req.url);                    // Url - returns '/'

    // POST METHOD 
    if (req.method === "POST") {
        if (req.url === "/elements"){
            let body = [];
            // let elementArr = [];
            req
                .on('error', (err) => {
                    console.error(err);
                    // if (err) {
                    // fs.readFile("./public/404.hmtl", "utf-8", (err, data) => {
                    //     res.writeHead(500, {'content-type': 'text/html'});
                    //     res.end(data);
                    // })
                    // }
                })
                .on('data', (chunk) => {
                    body.push(chunk);
                })
                .on('end', () => {
                    body = Buffer.concat(body).toString();
                    let parsedBody = qs.parse(body);

                    let bodyContents = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>The Elements - ${parsedBody.elementName}</title>
                  <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                  <h1>${parsedBody.elementName}</h1>
                  <h2>${parsedBody.elementSymbol}</h2>
                  <h3>Atomic Number ${parsedBody.elementAtomicNumber}</h3>
                  <p>${parsedBody.elementDescription}</p>
                  <p><a href="/">back</a></p>
                </body>
                </html>
                `

                    fs.writeFile(`./public/${(parsedBody.elementName).toLowerCase()}.html`, bodyContents, (err, data) => {
                        if (err) {
                            res.writeHead(500);
                            res.write('{status: error}');
                            res.end();
                        }

                        res.writeHead(200, {'content-type':'application/json'});
                        res.write('{"success" : true}');
                        res.end();
                    })



                    fs.readdir("./public", function (err, files) {
                        console.log("files", files);
                        console.log("files length", files.length - 4);
                        // <h3>`These are ${files.length -4}`</h3>

                        const elementArr = files.filter(file => {
                            if (file !== "index.html" && file !== "404.html" && file !== ".keep" && file !== "css") {
                                return file;
                            }
                        });
                        console.log("Elements Array", elementArr);

                        let string = "";
                    
                        let func = (el) => {
                            for (var i = 0; i < elementArr.length; i++) {
                                string +=  `    <li>
                                <a href="${el[i]}">${((el[i].split("."))[0]).charAt(0).toUpperCase()}${((el[i].split("."))[0]).slice(1)}</a>
                              </li>`
                            }
                            return string;
                        }

                     // Rewriting the index.html
                        let newBodyContent = `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                            <meta charset="UTF-8">
                            <title>The Elements</title>
                            <link rel="stylesheet" href="/css/styles.css">
                            </head>
                            <body>
                            <h1>The Elements</h1>
                            <h2>These are all the known elements.</h2>
                            <h3>These are ${elementArr.length}</h3>
                            <ol>
                            <!-- Function to loop through and create the file list -->
                            ${func(elementArr)}
                            </ol>
                            </body>
                            </html>
                                `
                    fs.writeFile(`./public/index.html`, newBodyContent, (err, data) => {
                        res.writeHead(200);
                        res.end(data);
                    })                    

                    });
                });
            };
    };
    

    



    // GET METHOD
     if (req.method === "GET") {
        
        // Don't need to add the css if you don't define the content-type in the res.writeHead  
        // if (req.url === "/styles.css") {
        //     fs.readFile("./public/styles.css", "utf-8", (err, data) => {
        //         res.writeHead(200, { 'content-type': 'text/css' });
        //         // res.write(data);  //Returned an "unhandled event" - "throw"
        //         res.end(data)
        //     });
        // }

        switch (req.url) {
            case "/":
                fs.readFile("./public/index.html", "utf-8", (err, data) => {
                    // res.writeHead(200, {'content-type':'text/html'}) -> with this way, you need to define the css 
                    res.writeHead(200);    
                    res.end(data);
                });
                break;
            case `${req.url}`:
                fs.readFile(`./public${req.url}`, "utf-8", (err, data) => {
                    res.writeHead(200);
                    res.end(data);
                });
                break;
            default:
                fs.readFile("./public/404.html", "utf-8", (err, data) => {
                    res.writeHead(500);
                    res.end(data);
                });   
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