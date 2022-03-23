var Request = require("request");
  
Request.get("http://localhost:3000/api/users", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
    console.log(`result = ${body}`);
});
