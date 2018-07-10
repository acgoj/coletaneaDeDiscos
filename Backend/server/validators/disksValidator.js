function validate (disk)
{
    const result = {}
    result.errors = []
    if(!disk.Name || disk.Name.trim().length == 0)
        result.errors.push('O campo nome de um disco é obrigatório.')
    else if(disk.Name.length > 45)
        result.errors.push('O campo nome de um disco tem que ter no máximo 45 caracteres.')
    if(disk.TracksCount === undefined)
        result.errors.push('O campo quantidade de músicas de um disco é obrigatório.')
    else if(disk.TracksCount <= 0)
        result.errors.push('O campo quantidade de músicas de um disco tem que ser maior que zero.')
    if(disk.Information && disk.Information.length > 200)
        result.errors.push('O campo informações de um disco tem que ter no máximo 200 caracteres.')
    if(disk.Artist && disk.Artist.length > 45)
        result.errors.push('O campo artista de um disco tem que ter no máximo 45 caracteres.')
    if(disk.Style && disk.Style.length > 45)
        result.errors.push('O campo estilo de um disco tem que ter no máximo 45 caracteres.')
    return result
}

module.exports = { validate }