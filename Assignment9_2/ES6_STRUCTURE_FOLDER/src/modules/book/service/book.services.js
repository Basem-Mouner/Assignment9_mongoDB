import { ObjectId } from "mongodb";
import { db } from "../../../DB/connection.js";
import authorModule from "../../../DB/model/author.module.js";
import BookModule from "../../../DB/model/book.module.js";
import LogsModule from "../../../DB/model/logs.module.js";
import { errorHandling } from "../../../utils/errorHandling.js";
//___________________________________________________________________
export const addBook = async (req, res, next) => {
  try {
    const { collectionName } = req.body;
    const result = BookModule;

    //  const result =await db.createCollection(collectionName, {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       required: ["title"],
    //       properties: {
    //         title: {
    //           bsonType: "string",
    //           description: "Title must be a non-empty string",
    //           minLength: 1,
    //         },
    //       },
    //     },
    //   },
    // });

    return res.status(200).json({ ok: "1" });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const addAuthor = async (req, res, next) => {
  try {
    const { name, nationality } = req.body;
    // Insert data into the "authors" collection
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .send({ error: '"name" field is required and must be a string' });
    }
    const result = await authorModule.insertOne({
      name,
      nationality,
    });
    return res.status(201).json({
      message: 'Document inserted into "authors" collection',
      result,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const logCapped = async (req, res, next) => {
  try {
    const { capped, size, max } = req.body;
    const result = db.createCollection("logs", {
      capped,
      size,
      max,
    });

    return res.status(201).json({
      message: 'Capped collection "logs" created with a size limit of 1MB',
    });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const indexedTitleBook = async (req, res, next) => {
  try {
    const { title } = req.body;

    const result = BookModule.createIndex({
      title,
    });
    return res.status(201).json({
      message: `title indexed as  ${title}`,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const insertOneBook = async (req, res, next) => {
  try {
    const result = await BookModule.insertOne(req.body);
    return res.status(201).json({
      message: `done inserted`,
      result,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const insertManyBook = async (req, res, next) => {
  try {
    const {} = req.body;

    const result = await BookModule.insertMany(req.body);
    return res.status(201).json({
      message: `done inserted`,
      result,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const insertALog = async (req, res, next) => {
  try {
    const { book_id, action } = req.body;

    const checkBookId = await BookModule.findOne({
      _id: new ObjectId(book_id),
    });
    if (!checkBookId) {
      return res.status(404).json({
        message: `missing book id`,
      });
    }
    const result = await LogsModule.insertOne({
      book_id: new ObjectId(book_id),
      action,
      timestamp: new Date(),
    });
    return res.status(201).json({
      message: `done inserted log`,
      result,
    });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const updateBook_Title = async (req, res, next) => {
  try {
    const { title, publishedYear } = req.body;

    const result = await BookModule.updateOne(
      { title }, // Filter to find the document
      { $set: { publishedYear } } // Update operation
    );
    result?.matchedCount
      ? res.status(200).json({
          message: `updated done`,
          result,
        })
      : res.status(400).json({
          message: `no book with this title`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;

    const books = await BookModule.find({ title }).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books with this title`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookByYear = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const books = await BookModule.find({
      publishedYear: { $gte: Number(from), $lte: Number(to) },
    }).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books in this rang year`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookInSpecificGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;

    const books = await BookModule.find({
      genre: { $in: [genre] },
    }).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books with this genre`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookBySkipAndLimit = async (req, res, next) => {
  try {
    const books = await BookModule.find()
      .sort({ publishedYear: -1 }) // Sort by publishedYear in descending order
      .skip(2) // Skip the first two books
      .limit(3) // Limit the result to the next three books
      .toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books for this conditions`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookYearINteger = async (req, res, next) => {
  try {
      const books = await BookModule.find({
        publishedYear: { $type: "int" }
    }).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books with integer year`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookExcludeGenres = async (req, res, next) => {
  try {
    const books = await BookModule.find({
      genre: { $nin: ["Horror", "science Fiction"] },
    }).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books with integer year`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const deleteBookByYearRange = async (req, res, next) => {
    try {
      const { year  } = req.query;
    const result = await BookModule.deleteMany({
      publishedYear: {$lt:Number(year) },
    });

    result.deletedCount > 0
      ? res.status(200).json({
          message: `Done`,
          result,
        })
      : res.status(400).json({
          message: `no books before this year`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookAggregate1 = async (req, res, next) => {
  try {
    
      const books = await BookModule.aggregate([
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
      ]).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books in this aggregation`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookAggregate2 = async (req, res, next) => {
  try {
    const books = await BookModule.aggregate([
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
    ]).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books in this aggregation`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookAggregate3 = async (req, res, next) => {
  try {
    const books = await BookModule.aggregate([
      {
        $unwind: "$genre", // Breaks the genres array into individual documents
      },
    ]).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books in this aggregation`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
export const searchBookAggregate4 = async (req, res, next) => {
  try {
    const books = await BookModule.aggregate([
      {
        $lookup: {
          from: "logs", // The collection to join
          localField: "_id", // Field from the books collection
          foreignField: "book_id", // Field from the logs collection
          as: "logs", // Name for the joined data
        },
      },
    ]).toArray();

    books.length > 0
      ? res.status(200).json({
          message: `Done`,
          books,
        })
      : res.status(400).json({
          message: `no books in this aggregation`,
        });
  } catch (error) {
    errorHandling(error, res);
  }
};
//___________________________________________________________________
