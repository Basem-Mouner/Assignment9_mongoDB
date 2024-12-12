//____________-Q1_________________
db.createCollection("books", {
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
//___________Q2__________________
db.authors.insertOne({
  name: "Jane Austen",
  nationality: "British",
});
//______________Q3____________
db.createCollection("logs", {
  capped: true,
  size: 1024 * 1024, // 1MB in bytes
  max: 50, // max number of documents in the collection
});
//________________Q4______________________
db.books.createIndex({ title: 1 });
//_________________Q5______________________
db.books.insertOne({
  title: "Book1",
  author: "Basem Mouner",
  publishedYear: 2024,
  genre: ["Technology", "Fantasy"],
});
//___________________Q6________________________
db.books.insertMany([
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960,
    genre: ["Fiction"]
  },
  {
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949,
    genre: ["Dystopian"]
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    publishedYear: 1851,
    genre: ["Adventure"]
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    publishedYear: 1932,
    genre: ["Dystopian", "science Fiction"]
  },
]);
//____________________Q7______________________
db.logs.insertOne({
  book_id: ObjectId("675862946f9c43fbfa0dcc52"), // Replace with a valid ObjectId from your books collection
  action: "Borrowed",
  timestamp: new Date(),
});
//__________________Q8______________________
db.books.updateOne(
  { title: "Future" }, // Filter to find the document
  { $set: { publishedYear: 2022 } } // Update operation
);
//___________________Q9______________________
db.books.find({ title: "Brave New World" });
//___________________Q10__________________________
db.books.find({
    publishedYear: { $gte: 1990, $lte: 2010 },
  })
  .sort({ publishedYear: 1 });
//______________________Q11______________________________
db.books.find({ genre: { $in: ["science Fiction"] } });
//________________________Q12________________________
db.books
  .find()
  .sort({ publishedYear: -1 }) // Sort by publishedYear in descending order
  .skip(2) // Skip the first two books
  .limit(3); // Limit the result to the next three books
//_____________________Q13__________________________________-

db.books.find({
  publishedYear: { $type: 16 }, // BSON type for integer
});
//___________________Q14___________________________
db.books.find({
  genre: { $nin: ["Horror", "Science Fiction"] },
});
//________________Q15___________________________
db.books.deleteMany({
  publishedYear: { $lt: 2000 },
});
//_________________Q16___________________________
db.books.aggregate([
  {
    $match: {
      publishedYear: { $gt: 2000 }, // Filters books published after 2000
    },
  },
  {
    $sort: {
      publishedYear: -1, // Sorts by year in descending order
    },
  },
]);
//__________________Q17_____________________________
db.books.aggregate([
  {
    $match: {
      publishedYear: { $gt: 2000 }, // Filters books published after 2000
    },
  },
  {
    $project: {
      _id: 0, // Excludes the `_id` field from the output
      title: 1, // Includes the `title` field
      author: 1, // Includes the `author` field
      publishedYear: 1, // Includes the `year` field
    },
  },
]);
//___________________Q18___________________________
db.books.aggregate([
  {
    $unwind: "$genre", // Breaks the genres array into individual documents
  },
]);
//__________________Q19_________________________________
db.books.aggregate([
  {
    $lookup: {
      from: "logs", // The collection to join
      localField: "_id", // Field from the books collection
      foreignField: "book_id", // Field from the logs collection
      as: "logs", // Name for the joined data
    },
  },
]);









db.orders.insertMany([
  { _id: 1, product: "Laptop", price: 1200, quantity: 4, date: "2024-12-01",size:['m','l'] },
  { _id: 2, product: "Phone", price: 8000, quantity: 10, date: "2024-12-02",size:['s','m','l'] },
  { _id: 3, product: "Tablet", price: 6000, quantity: 5, date: "2024-12-02",size:['s'] },
  { _id: 4, product: "Laptop", price: 12000, quantity: 2, date: "2024-12-03",size:['s','l'] },
  { _id: 5, product: "Phone", price: 8800, quantity: 8, date: "2024-12-03" ,size:['l']},
]);

db.orders.aggregate([
  {
    $match: { price: { $gt: 5000 } }, // Filter
  },
  {
    $project: {
      product: 1, //exclude
      price: 1, // include
      amount: "$quantity", //alias
      total: { $multiply: ["$quantity", "$price"] }, // generate new fields
    },
  },
  {
    $group: {
      _id: "$product",
      sum: { $sum: "$total" },
    },
  },
  {
    // arrays only
      $unwind: {
        path: "$size",
        includeArrayIndex: "tagIndex",
        preserveNullAndEmptyArrays: true
      }
    },
  {
    $sort: { sum: -1 },
  }
]);
