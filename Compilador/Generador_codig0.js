function generarCodigo(tokens) {
    let codigo = '';
    let current = 0;

    function avanzar() {
        current++;
    }

    function tokenActual() {
        return tokens[current];
    }

    function error(mensaje) {
        throw new Error(mensaje);
    }

    function generarExpresion() {
        let token = tokenActual();
        if (token && token.type === 'numero') {
            avanzar();
            return token.value;
        } else if (token && token.type === 'identificador') {
            avanzar();
            return token.value;
        } else {
            error('Error de sintaxis: se esperaba un número o un identificador.');
        }
    }

    function generarDeclaracion() {
        let token = tokenActual();
        console.log("token",token, "type:",token.type)
        if (token && token.type === 'identificador') { //aqui esta el error
            avanzar();
            codigo += 'let ' + token.value;
            token = tokenActual();
            if (token && token.type === '=') {
                avanzar();
                codigo += ' = ' + generarExpresion();
            }
            codigo += ';\n';
        } else {
            error('Error de sintaxis: se esperaba un identificador.');
        }
    }

    while (current < tokens.length) {
        generarDeclaracion();
    }

    return codigo;
}

// Ejemplo de uso
const tokens = [
    { type: 'identificador', value: 'x' },
    { type: 'operador', value: '=' },
    { type: 'numero', value: '10' },
    { type: 'Simbolo', value: ';' },
    { type: 'identificador', value: 'y' },
    { type: 'operador', value: '=' },
    { type: 'numero', value: '20' },
    { type: 'Simbolo', value: ';' }
];

function GenerarCode(){
    const codigoGenerado = generarCodigo(tokens);
console.log('Código generado:');
console.log(codigoGenerado);
}

