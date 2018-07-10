const collectionsDataProvider = require('../providers/collectionsDataProvider')
const validator = require('../validators/collectionValidator')

function deleteCollection(req, res)
{
    if(req.params.id)
    {
        const id = parseInt(req.params.id)
        const callback = function(error, data)
        {
            if(error)
                createError(res, 'Erro ao remover uma coleção: ' + error, 500)
            else
                res.json(data)
        }
        collectionsDataProvider.deleteCollection(callback, id)
    }
    else
        createError(res, 'CollectionId é obrigatório.', 412)
}

function deleteDiskFromCollection(req, res)
{
    if(req.params.idCollection && req.params.idDisk)
    {
        const idCollection = parseInt(req.params.idCollection)
        const idDisk = parseInt(req.params.idDisk)
        const callback = function(error, data)
        {
            if(error)
                createError(res, 'Erro ao remover um disco de uma coleção: ' + error, 500)
            else
                res.json(data)
        }
        collectionsDataProvider.deleteDiskFromCollection(callback, idCollection, idDisk)
    }
    else
        createError(res, 'CollectionId e DiskId são obrigatórios.', 412)
}

function addDiskToCollection(req, res)
{
    if(req.body.IdCollection && req.body.IdDisk)
    {
        const idCollection = parseInt(req.body.IdCollection)
        const idDisk = parseInt(req.body.IdDisk)
        const callback = function(error, data)
        {
            if(error)
                createError(res, 'Erro ao adicionar um disco de uma coleção: ' + error, 500)
            else
                res.json(data)
        }
        collectionsDataProvider.addDiskToCollection(callback, idCollection, idDisk)
    }
    else
        createError(res, 'CollectionId e DiskId são obrigatórios.', 412)
}

function updateCollection(req, res)
{
    if(req.params.id)
    {
        const collection = req.body.collection
        if(!collection || collection.Id != req.params.id)
            createError(res, 'Parâmetro Id e Coleção inconsistentes', 500)
        else
        {
            const validate = validator.validate(collection)
            if(validate.errors && validate.errors.length > 0)
                createError(res, validate.errors, 500)
            else
            {
                const callback = function(error, data)
                {
                    if(error)
                        createError(res, 'Erro ao atualizar uma coleção: ' + error, 500)
                    else
                        res.json(data)
                }
                collectionsDataProvider.updateCollection(callback, collection)
            }
        }
    }
    else
        createError(res, 'CollectionId é obrigatório.', 412)
}
function searchCollection(req, res)
{
    const text = req.params.text;
    const callback = function(error, data)
    {
        if(error)
            createError(res, 'Erro ao procurar coleções: ' + error, 500)
        else
            res.json(data)
    }
    collectionsDataProvider.searchCollection(callback, text)
}
function createCollection(req, res)
{
    const collection = req.body.collection
    if(!collection)
        createError(res, 'Mensagem sem informação de coleção')
    else
    {
        const validate = validator.validate(collection)
        if(validate.errors && validate.errors.length > 0)
            createError(res, validate.errors, 500)
        else
        {
            const callback = function(error, data)
            {
                if(error)
                    createError(res, 'Erro ao criar uma coleção: ' + error, 500)
                else
                    res.json(data)
            }
            collectionsDataProvider.createCollection(callback, collection)
        }
    }
}
function getCollectionById(req, res)
{
    if(req.params.id)
    {
        const id = parseInt(req.params.id)
        const callback = function(error, data)
        {
            if(error)
                createError(res, 'Erro ao buscar uma coleção: ' + error, 500)
            else
            {
                if(data[0].length == 1)
                {
                    const collection = { Id: data[0][0].Id, Name: data[0][0].Name, Disks: data[1] }
                    res.json(collection)
                }
                else if (data[0].length > 1)
                    createError(res, 'A busca por id retornou mais de 1 coleção', 500)
            }
        }
        collectionsDataProvider.getCollectionById(callback, id)
    }
    else
        createError(res, "CollectionId é obrigatório.", 412)
}
function getAllCollections(req, res)
{
    const callback = function(error, data)
    {
        if(error)
            createError(res, 'Erro ao buscar todas as coleções: ' + error, 500)
        else
            res.json(data)
    }
    collectionsDataProvider.getAllCollections(callback)
}

function createError(res, messageError, codeError)
{
    var err = {};
    err.message = messageError;
    err.status = codeError;
    res.status(codeError).send(err);
}

module.exports = { deleteCollection, addDiskToCollection, deleteDiskFromCollection, updateCollection, searchCollection, createCollection, getAllCollections, getCollectionById}