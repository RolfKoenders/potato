'use strict';

import test from 'ava';
import nock from 'nock';
import CouchPotato from '../../lib/couchpotato';
import config from '../data/config';

test.cb('[CP] Throw exception when the server is not reachable', t => {
    nock(`${config.couch.host}:${config.couch.port}/api/${config.couch.key}`)
        .get('/app.available')
        .reply(200, { success: true });

    const error = t.throws(() => {
        const unreachableServer = new CouchPotato({
            "host": "127.0.0.1",
            "port": "5050",
            "key": "test-key"
        });
    }, Error);

    t.is(error.message, 'Couchpotato server unreachable.');
    t.end();
});
