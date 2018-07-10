const express = require('express')
const mysql = require('mysql')
const config = require('../config/config.json')

function executeSqlQuery(query, callback, params)
{
    const connection = createConnection()
    connection.beginTransaction(function(err) 
    {
        if (err)
            callback(err, null)

        connection.query(query, params, function(err, results, fields) 
        {
            if (err) 
            { 
                connection.rollback(function() 
                {
                    callback(err, null)
                })
            }
            else
            {
                connection.commit(function(err) 
                {
                    if (err) 
                    { 
                        connection.rollback(function() 
                        {
                            callback(err,null);
                        });
                    }
                    else
                        callback(err, results)
                    connection.end();
                });
            }
        })
    })
}

function createConnection()
{
    return mysql.createConnection (
        {
            host : config.db.host,
            port : config.db.port,
            user : config.db.user,
            password : config.db.password,
            database : config.db.databaseName,
            multipleStatements : true
        })
}
module.exports = { executeSqlQuery }