require("dotenv").config();
const http = require("http");

const id = "9acc5199-6d1d-4b8a-8e11-9c05d0169805"; // Put here id of user which exists
const options = {
  hostname: "localhost",
  port: process.env.PORT,
  path: "/api/users/" + id,
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

test("Put the id of user which exists in db", () => {
  const req = http.request(options, (res) => {
    res.on('end', () => {
        expect(res.statusCode).toBe(204);
    })
  });

  req.on("error", (e) => {
    console.log(e);
  });

  req.end();
});
