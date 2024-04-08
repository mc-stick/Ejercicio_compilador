function Ejecutar_lexico() {
    const input = document.getElementById('code').value;
    const tokens = lex(input);
    //console.log(tokens);
    var replace = JSON.stringify(tokens).replace(/,"l":""/g, "\n");  

    document.getElementById('result_lex').textContent = replace; //JSON.stringify(tokens);
    mostrarTabla(tokens);

    GenerarCode(tokens);
  }

  function lex(input) {
    let tokens = [];
    let current = 0;

    while (current < input.length) {
      let char = input[current];

      if (/\s/.test(char)) {
        current++;
        continue;
      }

      if (/\d/.test(char)) {
        let value = '';
        while (/\d/.test(char)) {
          value += char;
          char = input[++current];
        }
        tokens.push({ type: 'numero', value,l:'' });
        continue;
      }

     
      if (/[a-zA-Z_]/.test(char)) {
        let value = '';
        while (/[a-zA-Z0-9_]/.test(char)) {
          value += char;
          char = input[++current];
        }

        if(value=='int'||value=='string'){
          tokens.push({ type: 'Identificador', value,l:''  });
          continue;
        }else{
        tokens.push({ type: 'Nombre de variable', value,l:''  });
        continue;
        }
      }

      if (/[\+\-\*\/\=\!=\==\<\>\<=\>=]/.test(char)) {
        tokens.push({ type: 'operador', value: char,l:'' });
        current++;
        continue;
      }

      if (/[\?\{\.\}\\\(\)\'\:\[\]\;\,]/.test(char)) {
        tokens.push({ type: 'Simbolo', value: char ,l:'' });
        current++;
        continue;
      }

      throw new TypeError('Caracter no válido: ' + char);
    }

    return tokens;
  }

  function mostrarTabla(tokens) {
  const tablaBody = document.getElementById('tabla_simbolos_body');
  tablaBody.innerHTML = '';

  tokens.forEach(token => {
    const row = document.createElement('tr');
    const tipoCell = document.createElement('td');
    tipoCell.textContent = token.type;
    const valorCell = document.createElement('td');
    valorCell.textContent = token.value;
    row.appendChild(tipoCell);
    row.appendChild(valorCell);
    tablaBody.appendChild(row);
  });
}