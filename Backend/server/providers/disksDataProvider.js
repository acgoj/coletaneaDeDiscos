const connection = require('./baseDataProvider')

function getAllDisks (callback) 
{
    return connection.executeSqlQuery('SELECT * FROM DISKS', callback)
}

function getDiskById (callback, id)
{
    return connection.executeSqlQuery('SELECT * FROM DISKS WHERE ID = ?', callback, id)
}

function createDisk (callback, disk)
{
    return connection.executeSqlQuery('INSERT INTO DISKS (NAME, ARTIST, STYLE, INFORMATION, TRACKSCOUNT) VALUES (?,?,?,?,?)', callback, [disk.Name, disk.Artist, disk.Style, disk.Information, parseInt(disk.TracksCount)])
}

function searchDisks (callback, text)
{
    const searchParam = '%' + text + '%'
    return connection.executeSqlQuery('SELECT * FROM DISKS D WHERE D.NAME LIKE ? OR ARTIST LIKE ? OR STYLE LIKE ? OR INFORMATION LIKE ?', callback, [searchParam, searchParam, searchParam, searchParam])
}

function updateDisk (callback, disk)
{
    return connection.executeSqlQuery('UPDATE DISKS D SET NAME = ?, ARTIST = ?, STYLE = ?, INFORMATION = ?, TRACKSCOUNT = ?  WHERE D.ID = ?', callback, [disk.Name, disk.Artist, disk.Style, disk.Information, parseInt(disk.TracksCount), disk.Id]);
}

function deleteDisk (callback, id)
{
    return connection.executeSqlQuery('DELETE FROM DISKS WHERE Id = ?', callback, id)
}

module.exports = { deleteDisk, updateDisk, searchDisks, createDisk, getDiskById, getAllDisks}