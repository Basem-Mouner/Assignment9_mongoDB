export function errorHandling(error, res) {
  if (error?.codeName  == "NamespaceExists") {
    // const errorDetails = error.errors.map((err) => {
    //   return { path: err.path, message: err.message };
    // });
    return res.status(400).json({ message: "Collection  already exists" });
  }

  return res.status(500).json({
    message: "fail",
    error,
    errMessage: error.message,
    stack: error.stack,
  });
}
