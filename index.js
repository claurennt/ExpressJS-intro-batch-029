const express = require("express");

//creates a new instance of an exoress application
const app = express();

/*defines which port to use  express with port to use based on the environment where the app is running
if the app is deployed on Heroku for example, its environment is Heroku, so Heroku will automatically add a PORT property to the process.env object and assign to it certain value
if the app is running locally then we want  it to use port number 3001
*/
const port = process.env.PORT || 3001;

//chainable route handlers for a certain path
app
  .route("/")
  .get((request, response) => {
    response.send("Welcome to our amazing API");
  })
  .post((req, res) => res.send("You have created a new resource"))
  .put((req, res) => res.send("You have modified a new resource"))
  .delete((req, res) => res.send("You have deleted a new resource"));

//we bind a certain method to a certain path and fire a callback when the server has received that request
app.get("/hello", (request, response) => {
  //we always end the request/esponse cycle by sending back a response to the client that started the request
  response.send("Hey!");
});

app.post("/hello", (req, res) => res.send("Hello post request"));

app.get("/users", (req, res) => {
  console.log(req.query);

  res.send("All the data about users");
});

app.get("/users/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  res.send(`You have requested the user with id ${id}`);
});

//app.post("/", (req, res) => res.send("You have created a new resource"));

//app.put("/", (req, res) => res.send("You have modified a new resource"));

//app.delete("/", (req, res) => res.send("You have deleted a new resource"));

//for every GET request to a path that our app does not know, we redirect the request to the "/" path
app.get("*", (req, res) => res.redirect("/"));

//you can have a "catch-all" wrong requests on an invalid path defined like this as well
app.all("*", (req, res) => {
  const { method, url } = req;
  res.send(
    `A ${method} on path ${url} can't be handled because this path is invalid `
  );
});

//we tell express to listen to a certain port and fire a callback when the server is ready to receive requests
app.listen(port, () => console.log(`Server is listening on port ${port}`));
