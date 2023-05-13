require("dotenv").config();
const http = require("http");

test("The empty array or array of User should be returned", () => {
  let data = "";
  const req = http.get(
    "http://localhost:" + process.env.PORT + "/api/users",
    (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const dataParsed = JSON.parse(data);
        expect(res.statusCode).toBe(200);
        if (Array.isArray(dataParsed) && dataParsed.length > 0) {
          expect(dataParsed).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                username: expect.any(String),
                age: expect.any(Number),
                hobbies: expect.arrayContaining([expect.any(String)]),
              }),
            ])
          );
        } else {
          expect(dataParsed).toEqual([]);
        }
      });
    }
  );

  req.on("error", (e) => {
    console.log(e);
  });
});
