const errors = {
  invalid_uuid: "Invalid id",
  user_not_exist: "User does not exist",
  missing_properties: "Some properties are missing",
  unexpected_error:
    "Sorry we have some problems in server. Our specialists are working on it. Thanks for your understanding!",
};

const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

module.exports = {
  errors,
  httpMethods,
};
