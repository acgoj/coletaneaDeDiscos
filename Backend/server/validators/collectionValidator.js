function validate(collection) {
  const result = {};
  result.errors = [];
  if (!collection.Name || collection.Name.trim().length == 0)
    result.errors.push("O campo nome de uma coleção é obrigatório.");
  else if (collection.Name.length > 45)
    result.errors.push(
      "O campo nome de uma coleção tem que ter no máximo 45 caracteres."
    );
  return result;
}

module.exports = { validate };
