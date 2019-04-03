const test = require("tape");
const validate = require("../../server/validators/collectionValidator");

function collectionValidator_collectionWithNameUndefined_ValidationError() {
  //arrange
  const collection = {};

  //act
  const result = validate.validate(collection);

  //assert
  test("Validar coleção sem nome", t => {
    t.assert(
      result.errors &&
        result.errors.length == 1 &&
        result.errors.find(
          a => a == "O campo nome de uma coleção é obrigatório."
        ),
      "Retornou o erro esperado"
    );
    t.end();
  });
}

function collectionValidator_colectionWithNameOnlyWhiteSpaces_ValidationError() {
  //arrange
  const collection = { Name: "  " };

  //act
  const result = validate.validate(collection);

  //assert
  test("Validar coleção com nome somente com espaços", t => {
    t.assert(
      result.errors &&
        result.errors.length == 1 &&
        result.errors.find(
          a => a == "O campo nome de uma coleção é obrigatório."
        ),
      "Retornou o erro esperado"
    );
    t.end();
  });
}

function collectionValidator_colectionWithNameInvalidLength_ValidationError() {
  //arrange
  const collection = { Name: "a".repeat(46) };

  //act
  const result = validate.validate(collection);

  //assert
  test("Validar coleção com nome maior que 45 caracteres", t => {
    t.assert(
      result.errors &&
        result.errors.length == 1 &&
        result.errors.find(
          a =>
            a ==
            "O campo nome de uma coleção tem que ter no máximo 45 caracteres."
        ),
      "Retornou o erro esperado"
    );
    t.end();
  });
}

function collectionValidator_CreateCollection_ResultWithoutError() {
  //arrange
  const collection = { Name: "a".repeat(45) };

  //act
  const result = validate.validate(collection);

  //assert
  test("Validar coleção correta", t => {
    t.assert(
      !result.errors || result.errors.length == 0,
      "A coleção está sem erros"
    );
    t.end();
  });
}

function AllTests() {
  collectionValidator_colectionWithNameOnlyWhiteSpaces_ValidationError();
  collectionValidator_collectionWithNameUndefined_ValidationError();
  collectionValidator_colectionWithNameInvalidLength_ValidationError();
  collectionValidator_CreateCollection_ResultWithoutError();
}

module.exports = { AllTests };
