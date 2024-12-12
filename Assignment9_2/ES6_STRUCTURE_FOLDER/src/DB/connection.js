import { MongoClient } from "mongodb";
const linkDB = "mongodb://localhost:27017";// Replace the uri string with your connection string.
const client = new MongoClient(linkDB); // mongosh

export const db = client.db('Assignment_9_books') //use sara7aProgram
//___________________________________________________________
export const connectDB = async () => {
     await client.connect().then((res) => {
          console.log("DB CONNECTED SUCCESS");
     }).catch((err) => {
          console.log("FAILED to Connected to DB", err);
     });
}
//__________________________________________________________________