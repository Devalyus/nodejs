require("dotenv").config();
const http = require("http");

const id = "d8f055ff-acc7-4d18-8ed0-bce52aaa0865"; // Put here id of user which exists
const rawdata = {
  username: "JohnDoe",
  age: 44,
  hobbies: ["cheating", "hiking"],
};

const requestData = JSON.stringify(rawdata);

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/users/" + id,
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": requestData.length,
  },
};

test("Put the id of user which exists in in-memory db", () => {
  let data = "";
  const req = http.request(options, (res) => {
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const dataParsed = JSON.parse(data);
      expect(res.statusCode).toBe(200);
      expect(dataParsed).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          ...rawdata,
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
