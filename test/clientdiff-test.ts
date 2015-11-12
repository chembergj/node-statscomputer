/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import ClientDiff = require('../lib/clientdiff');
import chai = require('chai');
var assert = chai.assert;

describe('datafeedreader', () => {

    var oldestTestClients: Array<ClientDiff.OnlineClient>;
    var newestTestClients: Array<ClientDiff.OnlineClient>;

    before(() => {

        oldestTestClients = [
            {
                CID: 1,
                callsign: "SAS123",
            },
            {
                CID: 2,
                callsign: "NAX456",
            }
        ];

        newestTestClients =
        [
            {
                CID: 1,				// Same as before
                callsign: "SAS123"
            },
            {
                CID: 2,				// Changed callsign
                callsign: "NAX789"
            },
            {		          			// Added          
                CID: 3,
                callsign: "AAL789"
            }
        ];

    });

    describe('calculateClosedConnections', () => {
        it("should return 1 closed connection", () => {

            var closedConnections = ClientDiff.calculateClosedConnections(oldestTestClients, newestTestClients);
            assert.equal(closedConnections.length, 1);
            assert.equal(closedConnections[0].CID, 2);
            assert.equal(closedConnections[0].callsign, "NAX456");

        });
    });
});

/*
import * as tsUnit from '../lib/tsUnit';

export class ClientDiffTests extends tsUnit.TestClass {

    constructor() {

        super();
    }

    calculateClosedConnections() {

        var oldestTestClients: Array<ClientDiff.OnlineClient> = [
            {
                CID: 1,
                callsign: "SAS123",
            },
            {
                CID: 2,
                callsign: "NAX456",
            }
        ];

        var newestTestClients: Array<ClientDiff.OnlineClient> =
            [
                {
                    CID: 1,				// Same as before
                    callsign: "SAS123"
                },
                {
                    CID: 2,				// Changed callsign
                    callsign: "NAX789"
                },
                {		          			// Added          
                    CID: 3,
                    callsign: "AAL789"
                }
            ];

        var newConnections = ClientDiff.calculateClosedConnections(oldestTestClients, newestTestClients);

        this.areIdentical(newConnections.length, 2);
        this.areIdentical(newConnections[0].CID, "2");
        this.areIdentical(newConnections[0].callsign, "NAX789");
        this.areIdentical(newConnections[1].CID, "3");
        this.areIdentical(newConnections[1].callsign, "AAL789");
    }
}

var tap = new tsUnit.Test(ClientDiffTests).getTapResults();

console.log(tap);*/
