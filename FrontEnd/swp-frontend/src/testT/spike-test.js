import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

function generateRandomID() {
    return Math.floor(Math.random() * 100); 
}

export const options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '1m', target: 300 },
        { duration: '5s', target: 0 }, 
    ],
};

const ids = new SharedArray('ids', function () {
    var ids = [];
    
    for (var i = 0; i < 100; i++) {
        ids.push(generateRandomID());
    }

    return ids;
});

export default () => {
    const randomID = ids[Math.floor(Math.random() * ids.length)];
    const res = http.get(`http://localhost:5014/api/koiFarm/view/${randomID}`);
    console.log(res.status, res.body,randomID);
    check(res, { '200': (r) => r.status === 200 });
    sleep(1);
};
