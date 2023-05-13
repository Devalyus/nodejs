require("dotenv").config();
const http = require("http");
const { validate } = require("uuid");
const { validateData } = require("./utils/validateData");
const { errors, httpMethods } = require("./constants/constants");

const { Database } = require("./db");
const port = process.env.PORT || 3000;

const db = new Database();
const server = http.createServer((req, res) => {
  process.on("uncaughtException", (err) => {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: ErrorMessages.unexpected_error,
      })
    );
  });


  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/users" && req.method === httpMethods.GET) {
    const data = JSON.stringify(db.getUsers());
    res.statusCode = 200;
    res.end(data);
  } else if (
    req.url?.startsWith("/api/users/") &&
    req.method === httpMethods.GET
  ) {
    const id = req.url?.substring(11);
    if (!validate(id)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: errors.invalid_uuid }));
      return;
    }
    const data = db.getUser(id);
    if (!data) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: errors.user_not_exist }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } else if (req.url === "/api/users" && req.method === httpMethods.POST) {
    let body = "";
    req.on("data", (chuck) => {
      body += chuck.toString();
    });

    req.on("end", () => {
      try {
        const parsed_body = JSON.parse(body);
        validateData(parsed_body);
        const record = db.createUser(parsed_body);
        res.statusCode = 201;
        res.end(JSON.stringify(record));
      } catch (err) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: err.message,
          })
        );
      }
    });
  } else if (
    req.url?.startsWith("/api/users/") &&
    req.method === httpMethods.PUT
  ) {
    const id = req.url?.substring(11);
    if (!validate(id)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: errors.invalid_uuid }));
      return;
    }

    let body = "";
    req.on("data", (chuck) => {
      body += chuck.toString();
    });

    req.on("end", () => {
      try {
        const parsed_body = JSON.parse(body);
        validateData(parsed_body);
        const record = db.updateUser(id, parsed_body);
        res.statusCode = 200;
        res.end(JSON.stringify(record));
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === errors.missing_properties) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: errors.missing_properties }));
          } else {
            res.statusCode = 404;
            res.end(
              JSON.stringify({
                message: errors.user_not_exist,
              })
            );
          }
        }
      }
    });
  } else if (
    req.url?.startsWith("/api/users/") &&
    req.method === httpMethods.DELETE
  ) {
    const id = req.url?.substring(11);
    if (!validate(id)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: errors.invalid_uuid }));
      return;
    }
    try {
      db.deleteUser(id);
      res.statusCode = 204;
      res.end();
    } catch (err) {
      if (err instanceof Error) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: err.message }));
      }
    }
  } else {
    res.statusCode = 404
    res.end({message: "404 Not Found"})
  }
});

server.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
