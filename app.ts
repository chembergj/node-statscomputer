/// <reference path="./typings/winston/winston.d.ts" />

import ClientDiff = require('./lib/clientdiff');
import mongodbdao = require('./lib/mongodbdao');
import winston = require('winston');

winston.add(winston.transports.File, { filename: 'statscomputer.log' });

function computeStats() {
    mongodbdao.getTwoOldestFromClientQueue((err, clientData) => {
        if (err) {
            console.error(err);
        }

        console.log('oldest: ' + clientData.oldest);
        console.log('nextToOldest: ' + clientData.nextToOldest);
        
        // var newConnections = ClientDiff.calculateNewConnections(clientData.oldest, clientData.nextToOldest);
        var closedConnections = ClientDiff.calculateClosedConnections(clientData.oldest, clientData.nextToOldest);
        for (var closedConn in closedConnections) {
            console.log("CLOSED: " + closedConn);
        }
        // mongodbdao.savestats(closedConnections);
        // TODO: update latest computed date
    });
}



computeStats();

/*
winston.info('Scheduling data fetch every ' + data.general.reload + ' minutes');
var intervalObj = setInterval(processOnlineClientBatch, parseInt(data.general.reload) * 60000, function(err, data) {
    if (err != null) {
        winston.error('Error calling readAndStoreAndQueueOnlineClient: ', { error: err });
    }
});

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('node-statscomputer isalive page!');
}).listen(3002, function() {
    winston.info('node-statscomputer listening on port 3002');
});
        });
    }
}); */