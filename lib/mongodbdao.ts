/// <reference path='../typings/mongodb/mongodb.d.ts' />
/// <reference path='../typings/winston/winston.d.ts' />

import mongodb = require("mongodb");
import winston = require('winston');

var url = 'mongodb://localhost:27017/vatstats';
var collection_clientqueue = 'clientprocessingqueue';

export interface OnlineClient {
    _id: string;
    callsign: string;
    CID: number;
    realname: string;
    clienttype: string;
    frequency: string;
    latitude: number;
    longitude: number;
    rating: number;
    facilitytype: number;
    time_logon: number;
};

export interface OnlinePilot extends OnlineClient {
    altitude: number;
    groundspeed: number;
    planned_aircraft: string;
    planned_depairport: string;
    planned_altitude: number;
    planned_destairport: string;
    planned_flighttype: string;
    planned_altairport: string;
    planned_remarks: string;
    planned_route: string;
    heading: string;
}

export interface OnlineAtc extends OnlineClient {
    atis_message: string;
}


export function getTwoOldestFromClientQueue(callback: (err: Error, clients: { oldest: Array<OnlineClient>, nextToOldest: Array<OnlineClient> }) => void) {

    mongodb.MongoClient.connect(url, (err: Error, db: mongodb.Db) => {
        if (err != null) {
            callback(err, null);
        }

        db.collection(collection_clientqueue, (err: Error, clientqueue_collection: mongodb.Collection) => {
            clientqueue_collection.aggregate([{ $group: { _id: 0, minTimestamp: { $min: "$timestamp" } } }], (err, result) => {
                var oldestTimestamp = result[0].minTimestamp;
                console.log('OLDEST: ', oldestTimestamp);
                db.collection(collection_clientqueue).find({ timestamp: oldestTimestamp }).toArray((err: Error, result: Array<OnlineClient[]>) => {
                    if (result.length > 1) {
                        callback(err, { oldest: result[0], nextToOldest: result[1] });
                    }
                    else {
                        callback(err, null);
                    }
                });
            });
        });
    });
}
    /*savestats: function(clients, callback) {
    
        mongoClient.connect(mongodbdao._url, function(err, db) {
            if (err != null) {
                callback(err);
            }
            else {
                db.collection(mongodbdao._collection_sessionstats).insertMany(clients.map(function(connection) {
                    return {
                        callsign: connection.callsign,
                        CID: connection.CID,
                        start: 	// TODO: mangler en startdato, bør kunne findes vha. getTwoOldestFromClientQueue sender sin dato med
                        sessionlength: connection.time_logon
                    }
                }), function(err, result) {
                    db.close();
                    callback(err);
                });
            }
        });
    },*/
