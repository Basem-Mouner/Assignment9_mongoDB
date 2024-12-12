import { db } from "../connection.js";

const BookModule = db.collection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          description: "Title must be a non-empty string",
          minLength: 1,
        },
      },
    },
  },
});
export default BookModule;
