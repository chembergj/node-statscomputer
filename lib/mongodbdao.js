var mongoClient = require('mongodb').MongoClient,
	winston = require('winston'),
	assert = require('assert');
	
var mongodbdao = {
	
	_url: 'mongodb://localhost:27017/vatstats',
	_collection_clientqueue: 'clientprocessingqueue',
		
	getTwoOldestFromClientQueue: function(callback) {
		mongoClient.connect(mongodbdao._url, function(err, db) {
			if(err != null) {
				callback(err, null);
			}
			else {
				db.collection(mongodbdao._collection_clientqueue).aggregate( [ { $group: { _id: 0, minTimestamp: { $min: "$timestamp" }} } ] ).toArray(function(err, result) {
					var oldestTimestamp = result[0].minTimestamp;
					console.log('OLDEST: ', oldestTimestamp);
					db.collection(mongodbdao._collection_clientqueue).find({ timestamp: oldestTimestamp}).toArray(function(err, result) {
						if(result.length > 1) {
							callback(err, { oldest: result[0], nextToOldest: result[1] });
						}
						else {
							callback(err, null);
						}
					});
				});
			}
		});
	}
};

exports.mongodbdao = mongodbdao;

		