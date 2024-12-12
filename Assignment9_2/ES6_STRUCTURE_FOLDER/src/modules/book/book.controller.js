import { Router } from "express";
const router = Router();

import * as BookServices from "./service/book.services.js";

router.post("/collection/books", BookServices.addBook);   
router.post("/collection/authors", BookServices.addAuthor); 
router.post("/collection/logs/capped", BookServices.logCapped);    
router.post("/collection/books/index", BookServices.indexedTitleBook); 

router.post("/books", BookServices.insertOneBook);
router.post("/books/batch", BookServices.insertManyBook);
router.post("/logs", BookServices.insertALog);

router.patch("/books/Future", BookServices.updateBook_Title);
router.get("/books/title", BookServices.searchBookByTitle);
router.get("/books/year", BookServices.searchBookByYear);
router.get("/books/genre", BookServices.searchBookInSpecificGenre);
router.get("/books/skip_limit", BookServices.searchBookBySkipAndLimit);
router.get("/books/year_integer", BookServices.searchBookYearINteger);
router.get("/books/exclude_genres", BookServices.searchBookExcludeGenres);
router.delete("/books/before_year", BookServices.deleteBookByYearRange);
router.get("/books/aggregate1", BookServices.searchBookAggregate1);
router.get("/books/aggregate2", BookServices.searchBookAggregate2);
router.get("/books/aggregate3", BookServices.searchBookAggregate3);
router.get("/books/aggregate4", BookServices.searchBookAggregate4);

export default router;