const disksDataProvider = require('../providers/disksDataProvider')
const validator = require('../validators/disksValidator')

function deleteDisk(req, res)
{
    if(req.params.id)
    {
        const id = parseInt(req.params.id)
        const callback = function (error, data)
        {
            if(error)
                createError(res, 'Erro ao remover um disco: ' + error, 500)    
            else
                res.json(data)
        }
        disksDataProvider.deleteDisk(callback, id)
    }
    else
        createError(res, 'DiskId é obrigatório', 412)
}
function updateDisk(req, res)
{
    if(req.params.id)
    {
        const disk = req.body.disk
        if(!disk || disk.Id != req.params.id)
            createError(res, 'Parâmetro Id e Disco inconsistentes', 500)
        else
        {
            const validate = validator.validate(disk)
            if(validate.errors && validate.errors.length > 0)
                createError(res, validate.errors, 500)
            else
            {
                const callback = function (error, data)
                {
                    if(error)
                        createError(res, 'Erro ao atualizar um disco: ' + error, 500)    
                    else
                        res.json(data)
                }
                disksDataProvider.updateDisk(callback, disk)
            }
        }
    }
    else
        createError(res, 'DiskId é obrigatório', 412)
}
function searchDisks(req, res)
{
    const text = req.params.text;
    const callback = function (error, data)
    {
        if(error)
            createError(res, 'Erro ao procurar discos: ' + error, 500)    
        else
            res.json(data)
    }
    disksDataProvider.searchDisks(callback, text)
}
function createDisk(req, res)
{
    const disk = req.body.disk
    if(!disk)
        createError(res, 'Mensagem sem informação de disco', 500)
    else
    {
        const validate = validator.validate(disk)
        if(validate.errors && validate.errors.length > 0)
            createError(res, validate.errors, 500)
        else
        {
            const callback = function (error, data)
            {
                if(error)
                    createError(res, 'Erro ao criar um discos: ' + error, 500)    
                else
                    res.json(data)
            }
            disksDataProvider.createDisk(callback, disk)
        }
    }
}
function getDiskById(req, res)
{
    if(req.params.id)
    {
        const id = parseInt(req.params.id)
        const callback = function (error, data)
        {
            if(error)
                createError(res, 'Erro ao buscar um discos: ' + error, 500)    
            else
                res.json(data)
        }
        disksDataProvider.getDiskById(callback, id)
    }
    else
        createError(res, 'DiskId é obrigatório', 412)
}
function getAllDisks(req, res)
{
    const callback = function (error, data)
    {
        if(error)
            createError(res, 'Erro ao buscar todos os discos: ' + error, 500)    
        else
            res.json(data)
    }
    disksDataProvider.getAllDisks(callback)
}

function createError(res, messageError, codeError)
{
    var err = {};
    err.message = messageError;
    err.status = codeError;
    res.status(codeError).send(err);
}

module.exports = { deleteDisk, updateDisk, searchDisks, createDisk, getDiskById, getAllDisks}