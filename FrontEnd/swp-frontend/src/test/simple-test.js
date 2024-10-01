import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '10s'
};

export default () => {
   const res= http.get('http://localhost:5014/api/account/0a7b7ceb-6ef0-432b-b6c0-4cacdb8031cf');
//    console.log('Response:', JSON.stringify(res));
//    console.log('Response body:', res.body);
//    console.log('Response status:', res.status);
};