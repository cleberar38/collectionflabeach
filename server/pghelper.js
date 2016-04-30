var pg = require('pg'),
    config = require('./config'),
    Q = require('q'),
    databaseURL = config.databaseURL;
/**
 * Utility function to execute a SQL query against a Postgres database
 * @param sql
 * @param values
 * @param singleItem
 * @returns {promise|*|Q.promise}
 */
exports.query = function (sql, values, singleItem, dontLog) {

    if (!dontLog) {
        console.log(sql, values);
    }

    var deferred = Q.defer();

    pg.connect(databaseURL, function (err, conn, done) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        }
        try {
            conn.query(sql, values, function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log(result);
                    deferred.resolve(singleItem ? result.rows[0] : result.rows);
                }
            });
        }
        catch (e) {
            done();
            console.log(e);
            deferred.reject(e);
        }
    });
    return deferred.promise;
};