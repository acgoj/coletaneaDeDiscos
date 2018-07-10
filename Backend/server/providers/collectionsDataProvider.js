const connection = require('./baseDataProvider')

function getAllCollections (callback) 
{
    return connection.executeSqlQuery('SELECT * FROM COLLECTIONS', callback)
}

function getCollectionById (callback, id)
{
    return connection.executeSqlQuery('SELECT * FROM COLLECTIONS C WHERE C.ID = ?; SELECT * FROM DISKS D INNER JOIN COLLECTION_DISK CD ON D.ID = CD.IDDISK WHERE CD.IDCOLLECTION = ?', callback, [id, id])
}

function createCollection (callback, collection)
{
    return connection.executeSqlQuery('INSERT INTO COLLECTIONS (NAME) VALUES (?)', callback, collection.Name)
}

function searchCollection (callback, text)
{
    const searchParam = '%' + text + '%'
    return connection.executeSqlQuery('SELECT * FROM COLLECTIONS C WHERE C.NAME LIKE ?', callback, searchParam)
}

function updateCollection (callback, collection)
{
    const Id = [parseInt(collection.Id)]
    let sqlQuery = 'UPDATE COLLECTIONS SET NAME = ? WHERE ID = ?; '
    let params = [collection.Name, Id]
    return connection.executeSqlQuery(sqlQuery, callback, params);
}

function deleteCollection (callback, id)
{
    return connection.executeSqlQuery('DELETE FROM COLLECTIONS WHERE ID = ?', callback, id)
}

function deleteDiskFromCollection (callback, idCollection, idDisk)
{
    return connection.executeSqlQuery('DELETE FROM COLLECTION_DISK WHERE IDCOLLECTION = ? AND IDDISK = ?', callback, [idCollection, idDisk])
}

function addDiskToCollection (callback, idCollection, idDisk)
{
    return connection.executeSqlQuery('INSERT INTO COLLECTION_DISK (IDCOLLECTION, IDDISK) VALUES (?,?)', callback, [idCollection, idDisk])
}

module.exports = { deleteCollection, addDiskToCollection, deleteDiskFromCollection, updateCollection, searchCollection, createCollection, getAllCollections, getCollectionById}