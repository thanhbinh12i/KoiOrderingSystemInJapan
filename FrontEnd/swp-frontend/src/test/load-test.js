import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const options = {
    stages: [
        { duration: '30s', target: 200 }, // ramp up
        { duration: '5m', target: 200 }, // stable
        { duration: '30s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete within 100ms
    }
};

const guids = new SharedArray('guids', function () {
    var guids = [];
    
    for (var i = 0; i < 100; i++) {
        guids.push(generateUUID());
    }

    return guids;
});

export default () => {
    const randomGUID = guids[Math.floor(Math.random() * guids.length)];
    const res = http.get(`http://localhost:5014/api/account/${randomGUID}`);
    console.log(res.status, res.body);
    check(res, { '200': (r) => r.status === 200 });
    sleep(1);
};
