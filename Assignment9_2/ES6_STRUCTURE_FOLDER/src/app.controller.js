import bookController from "./modules/book/book.controller.js";
import { connectDB } from "./DB/connection.js";

const bootstrap = (app, express) => {
  //_____________middle ware___________________
  app.use(express.json()); //convert buffer data
  //_____________DB CONNECTION___________
  connectDB();
  //________________
  //___________app routing_____________________
  app.get("/", (req, res, next) =>
    res
      .status(200)
      .json({ message: "Hello in my New Folder Structure express ES6" })
  );
  //_____________sup express routing____________
 
  app.use("/", bookController);
  //______________________________________________
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "page not found" });
  });
  //________________________________________________
};

export default bootstrap;
