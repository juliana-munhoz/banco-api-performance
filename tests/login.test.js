import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  //iterations: 50,
  vus: 10,
  duration:'30s',
  Thresholds:{
    http_req_duration: ['p(95)<3000','min<5000'],
    iteration_duration: ['avg<3000'], 
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const url = 'http://localhost:3000/login';
  const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resposta = http.post(url, payload, params);

  check(resposta, {
    'Validar que o status é 200': (r) => r.status === 200,
    'Validar que o token é string': (r) => typeof(r.json().token) == 'string',
  });

  sleep(1);
}