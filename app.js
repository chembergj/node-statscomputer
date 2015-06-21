var http = require('http'), 
	path = require('path'),
	clientdiff = require('./lib/clientdiff').clientdiff,
	mongodbdao = require('./lib/mongodbdao').mongodbdao,
	winston = require('winston');


winston.add(winston.transports.File, { filename: 'statscomputer.log' });

var computeStats = function(callback) {
	mongodbdao.getTwoOldestFromClientQueue(function(err, clientData){
		var newConnections = clientdiff.calculateNewConnections(clientData.oldest, clientData.nextToOldest);
		var closedConnections = clientdiff.calculateClosedConnections(clientData.oldest, clientData.nextToOldest);
		
	} );
}



serverlistreader.readServerList('http://status.vatsim.net', function(err, serverlist) {
	if(err != null) {
		winston.error('Failed to read serverlist: ', { error:  err });
	}
	else {
		vatstatconfig.serverlist = serverlist;
		winston.info('Read ' + serverlist.length + ' dataservers');
		
		computeStatsprocessOnlineClientBatch(function(err, data) {
			
			winston.info('Scheduling data fetch every ' + data.general.reload + ' minutes');
			var intervalObj = setInterval(processOnlineClientBatch, parseInt(data.general.reload)*60000, function(err, data) {
				if(err != null) {
					winston.error('Error calling readAndStoreAndQueueOnlineClient: ', { error: err});
				}
			});
			
			http.createServer(function(req, res) {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('node-statscomputer isalive page!');
			}).listen(3002, function(){
				winston.info('node-statscomputer listening on port 3002');
			});
		});
	}
});