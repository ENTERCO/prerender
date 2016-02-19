var prerender = require('./lib')

var server = prerender({
    workers: 4,
    iterations: 40,
    phantomArguments: ["--load-images=false", "--ignore-ssl-errors=true"],
    phantomBasePort: 12200,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});

// server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
//server.use(prerender.inMemoryHtmlCache());
server.use(prerender.s3HtmlCache());

server.start();
