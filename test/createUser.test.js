require("dotenv").config();
const http = require("http");

const requestData = JSON.stringify({
  username: "JohnDoe",
  age: 25,
  hobbies: ["reading", "swimming"],
});

const options = {
  hostname: "localhost",
  port: process.env.PORT,
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": requestData.length,
  },
};

test("The empty array or array of User should be returned", () => {
  let data = "";
  const req = http.request(options, (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const dataParsed = JSON.parse(data);
      expect(res.statusCode).toBe(201);
      expect(dataParsed).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          username: "JohnDoe",
          age: 25,
          hobbies: ["reading", "swimming"],
        })
      );
    });
  });

  req.on("error", (e) => {
    console.log(e);
  });

  req.write(requestData);
  req.end();
});
