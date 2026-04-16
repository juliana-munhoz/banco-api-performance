import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { obterBaseURL } from '../utils/variaveis.js';
const postTransferencias = JSON.parse(open('../fixtures/postTransferencias.json'));

export const options = {
  stages: [
    {duration: '10s', target:10 },
    {duration: '10s', target:30 },
    {duration: '20s', target:30 },
    {duration: '20s', target:0  }
  ],
  Thresholds:{
    http_req_duration: ['p(95)<3000','min<5000'],
    iteration_duration: ['avg<3000'], 
    http_req_failed: ['rate<0.01']
  }
};

export default function () {

  const token = obterToken()

  const url = obterBaseURL() + '/transferencias';

  const payload = JSON.stringify(postTransferencias);

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };

  const resposta = http.post(url, payload, params);

  check(resposta, {
    'Validar que o status é 201': (r) => r.status === 201,

  });

  sleep(1);

}
