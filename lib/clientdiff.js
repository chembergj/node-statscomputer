var clientdiff = {
		
		buildDictionary: function(client) {
			dict = {};
			for(var i = 0; i < client.length; i++) {
				dict[client[i].CID + ':' + client[i].callsign] = client[i];
			}
			
			return dict;
		},
		
		
		calculateNewConnections: function(oldestClientDictionary, newestClientDictionary) {
			var newConnections = [];
			for(var value in newestClientDictionary) {
				if(oldestClientDictionary[value] == null) {
					var splitValue = value.split(':');
					newConnections.push({ CID: splitValue[0], callsign: splitValue[1]});
				}
			}
			
			return newConnections;
		},
		
		calculateClosedConnections: function(oldestClientDictionary, newestClientDictionary) {
			var closedConnections = [];
			for(var value in oldestClientDictionary) {
				if(newestClientDictionary[value] == null) {
					var splitValue = value.split(':');
					closedConnections.push({ CID: splitValue[0], callsign: splitValue[1]});
				}
			}
			
			return closedConnections;
		}
};

exports.clientdiff = clientdiff;