var assert = require('assert');

describe('datafeedreader', function() {

	var clientdiff;
	var httpmock;
	
	var oldestTestClients;
	var newestTestClients;
	                                    			
	before(function() {
		clientdiff = require('../lib/clientdiff').clientdiff;
		oldestTestClients = clientdiff.buildDictionary([
	    	    {		                    
	    			CID: "1",
	    			callsign: "SAS123"
	    	    },
	    	    {		                    
	    			CID: "2",
	    			callsign: "NAX456"
	    	    }
	    	    
	    	]);
	    	
    	newestTestClients = clientdiff.buildDictionary( 
    	[
    	    {		                    
    			CID: "1",				// Same as before
    			callsign: "SAS123"
    	    },
    	    {		                    
    			CID: "2",				// Changed callsign
    			callsign: "NAX789"
    	    },
    	    {		          			// Added          
    			CID: "3",
    			callsign: "AAL789"
    	    }
    	]);

	});
	
	describe('calculateNewConnections', function() {
		it("should return added connections", function() {
			
			var newConnections = clientdiff.calculateNewConnections(oldestTestClients, newestTestClients);
			assert.equal(newConnections.length, 2);
			assert.equal(newConnections[0].CID, "2");
			assert.equal(newConnections[0].callsign, "NAX789");
			assert.equal(newConnections[1].CID, "3");
			assert.equal(newConnections[1].callsign, "AAL789");
			
		});
	});
	
	describe('calculateClosedConnections', function() {
		it("should return closed connections", function() {
			
			var closedConnections = clientdiff.calculateClosedConnections(oldestTestClients, newestTestClients);
			assert.equal(closedConnections.length, 1);
			assert.equal(closedConnections[0].CID, "2");
			assert.equal(closedConnections[0].callsign, "NAX456");

		});
	});
});