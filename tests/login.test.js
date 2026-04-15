import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  iterations: 50,

  Thresholds:{
    http_req_duration: ['p(95)<4','min<3'],
    iteration_duration: ['avg<3000'], 
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