import { db } from "../connection.js";

const authorModule = db.collection("authors");
export default authorModule;
