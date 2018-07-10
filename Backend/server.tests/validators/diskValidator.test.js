const test = require('tape')
const validate = require('../../server/validators/disksValidator')

function disksValidator_diskWithNameUndefined_ValidationError()
{
    const result = validate.validate({ TracksCount: 2 })

    test('Validar disco sem nome', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find(((a) => a == 'O campo nome de um disco é obrigatório.')), "Retornou o erro esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithNameOnlyWhiteSpaces_ValidationError()
{
    const result = validate.validate({ Name: "  ", TracksCount: 2 })

    test('Validar disco com nome somente com espaços', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find(((a) => a == 'O campo nome de um disco é obrigatório.')), "Retornou o erro esperado")
        t.end()
        }
    )
}
function disksValidator_diskWithNameInvalidLength_ValidationError()
{
    const result = validate.validate({ Name: "d".repeat(46), TracksCount: 1  })

    test('Validar disco com o campo estilo com 46 caracteres', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo nome de um disco tem que ter no máximo 45 caracteres.'), "Retornou a quantidade de erros esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithTrackCountUndefined_ValidationError()
{
    const result = validate.validate({ Name: "nome Aleatorio" })

    test('Validar disco sem quantidade de musicas', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find(((a) => a == 'O campo quantidade de músicas de um disco é obrigatório.')), "Retornou o erro esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithTrackCountNegative_ValidationError()
{
    const result = validate.validate({ Name: "nome Aleatorio", TracksCount: -1  })

    test('Validar disco com quantidade de musicas negativo', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo quantidade de músicas de um disco tem que ser maior que zero.'), "Retornou o erro esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithTrackCountZero_ValidationError()
{
    const result = validate.validate({ Name: "nome Aleatorio", TracksCount: 0  })

    test('Validar disco com quantidade de musicas igual a zero', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo quantidade de músicas de um disco tem que ser maior que zero.'), "Retornou o erro esperado")
        t.end()
        }
    )
}
function disksValidator_diskWithManyErrors_ValidationError()
{
    const result = validate.validate({ Name: "  ", TracksCount: 0  })

    test('Validar disco com quantidade de erros maiores que 1', (t) => {
        t.assert(result.errors && result.errors.length == 2 , "Retornou a quantidade de erros esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithArtistInvalidLength_ValidationError()
{
    const result = validate.validate({ Name: "disco", TracksCount: 1, Artist: 'a'.repeat(46)  })

    test('Validar disco com o campo artista com 46 caracteres', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo artista de um disco tem que ter no máximo 45 caracteres.'), "Retornou a quantidade de erros esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithStyleInvalidLength_ValidationError()
{
    const result = validate.validate({ Name: "disco", TracksCount: 1, Style: 'a'.repeat(46)  })

    test('Validar disco com o campo estilo com 46 caracteres', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo estilo de um disco tem que ter no máximo 45 caracteres.'), "Retornou a quantidade de erros esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithInformationInvalidLength_ValidationError()
{
    const result = validate.validate({ Name: "disco", TracksCount: 1, Information: 'a'.repeat(201)  })

    test('Validar disco com o campo informação com 201 caracteres', (t) => {
        t.assert(result.errors && result.errors.length == 1 && result.errors.find((a) => a == 'O campo informações de um disco tem que ter no máximo 200 caracteres.'), "Retornou a quantidade de erros esperado")
        t.end()
        }
    )
}

function disksValidator_diskWithOnlyNameAndTracksCount_ResultWithoutError()
{
    const result = validate.validate({ Name: "disco", TracksCount: 1 })

    test('Validar disco somente com nome e quantidade de musicas no disco', (t) => {
        t.assert(!result.errors || result.errors.length == 0, "Validou o disco corretamente")
        t.end()
        }
    )
}

function disksValidator_diskWithAllProperties_ResultWithoutError()
{
    const result = validate.validate({ Name: "disco", TracksCount: 1, Artist: "a".repeat(45), Style: "a".repeat(45), Information: "a".repeat(200) })

    test('Validar disco somente com nome e quantidade de musicas no disco', (t) => {
        t.assert(!result.errors || result.errors.length == 0, "Validou o disco corretamente")
        t.end()
        }
    )
}

function AllTests()
{
    disksValidator_diskWithNameUndefined_ValidationError()
    disksValidator_diskWithNameOnlyWhiteSpaces_ValidationError()
    disksValidator_diskWithNameInvalidLength_ValidationError()
    disksValidator_diskWithTrackCountNegative_ValidationError()
    disksValidator_diskWithTrackCountZero_ValidationError()
    disksValidator_diskWithTrackCountUndefined_ValidationError()
    disksValidator_diskWithManyErrors_ValidationError()
    disksValidator_diskWithArtistInvalidLength_ValidationError(),
    disksValidator_diskWithInformationInvalidLength_ValidationError()
    disksValidator_diskWithStyleInvalidLength_ValidationError()
    disksValidator_diskWithOnlyNameAndTracksCount_ResultWithoutError()
    disksValidator_diskWithAllProperties_ResultWithoutError()
}

module.exports = { AllTests }