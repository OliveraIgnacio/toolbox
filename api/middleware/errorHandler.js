export function errorHandler(error, req, res, next) {
  console.log(error);

  if (!error) {
    return res.status(500).send("Hubo un error desconocido.");
  }

  if (error.safe) {
    return res.status(error.code || 400).send({ error: error.message });
  }

  return res
    .status(error.code || 400)
    .send({ error: "Hubo un error desconocido." });
}
