const errorHandler = (error, req, res, next) => {
  console.log("\x1b[33m%s\x1b[0m", error.stack);

  res.status(error.status || 500).json({ error: error.message });
};

export { errorHandler };
