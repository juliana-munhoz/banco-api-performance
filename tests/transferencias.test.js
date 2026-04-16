import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
const postTransferencias = JSON.parse(open('../fixtures/postTransferencias.json'));

export const options = {
  iterations: 1
};

export default function() {

  const token = obterToken()

  const url = 'http://localhost:3000/transferencias';
  
  const payload = JSON.stringify(postTransferencias);

  //postTransferencias.JSON.token = token;
  
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
