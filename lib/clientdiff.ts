export interface OnlineClient {
    callsign: string;
    CID: number;
};

function buildDictionary(clients: Array<OnlineClient>): { [cid: string]: OnlineClient; } {
    var dict: { [cid: string]: OnlineClient; } = {};

    for (var i = 0; i < clients.length; i++) {
        dict[clients[i].CID + ':' + clients[i].callsign] = clients[i];
    }

    return dict;
}

export function calculateClosedConnections(oldestClientDictionary: Array<OnlineClient>, newestClientDictionary: Array<OnlineClient>): Array<OnlineClient> {

    var oldestCIDCallsignDictionary = buildDictionary(oldestClientDictionary);
    var newestCIDCallsignDictionary = buildDictionary(newestClientDictionary);

    var closedConnections: Array<OnlineClient> = [];
    for (var callsignCID in oldestCIDCallsignDictionary) {
        if (newestCIDCallsignDictionary[callsignCID] == null) {
            closedConnections.push(oldestCIDCallsignDictionary[callsignCID]);
        }
    }

    return closedConnections;
}
