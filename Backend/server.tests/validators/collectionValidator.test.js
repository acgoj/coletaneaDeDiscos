const test = require('tape')
const validate = require('../../server/validators/collectionValidator')

function collectionValidator_collectionWithNameUndefined_ValidationError()
{
    const result = validate.validate({ })

    test('Validar coleção sem nome', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find(((a) => a == 'O campo nome de uma coleção é obrigatório.')), "Retornou o erro esperado")
        t.end()
        }
    )
}

function collectionValidator_colectionWithNameOnlyWhiteSpaces_ValidationError()
{
    const result = validate.validate({ Name: "  "})

    test('Validar coleção com nome somente com espaços', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find(((a) => a == 'O campo nome de uma coleção é obrigatório.')), "Retornou o erro esperado")
        t.end()
        }
    )
}

function collectionValidator_colectionWithNameInvalidLength_ValidationError()
{
    const result = validate.validate({ Name: 'a'.repeat(46) })

    test('Validar coleção com nome maior que 45 caracteres', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo nome de uma coleção tem que ter no máximo 45 caracteres.'), "Retornou o erro esperado")
        t.end()
        }
    )
}

function collectionValidator_CreateCollection_ResultWithoutError()
{
    const result = validate.validate({ Name: 'a'.repeat(45) })

    test('Validar coleção correta', (t) => {
        t.assert(!result.errors || result.errors.length == 0, "A coleção está sem erros")
        t.end()
        }
    )
}

function AllTests()
{
    collectionValidator_colectionWithNameOnlyWhiteSpaces_ValidationError()
    collectionValidator_collectionWithNameUndefined_ValidationError()
    collectionValidator_colectionWithNameInvalidLength_ValidationError()
    collectionValidator_CreateCollection_ResultWithoutError()
}

module.exports = { AllTests }