import { db } from "../connection.js";

const LogsModule = db.collection("logs");
export default LogsModule;
