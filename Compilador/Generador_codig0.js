function generarCodigo(tokens) {
    let codigo = '';
    let space=" ";
    let cont=0;

    // Recorre cada token y genera el código correspondiente
    tokens.forEach(token => {
        if (token.type === 'Nombre de variable') {
            // Si el tipo es "Nombre de variable", agrega el valor del token al código
            codigo += token.value + ' ';
        } else if (token.type === 'numero') {
            // Si el tipo es "numero", agrega el valor del token al código
            codigo += token.value + ' ';
        } else if (token.type === 'operador') {
            // Si el tipo es "operador", agrega el valor del token al código
            codigo += token.value + ' ';
        } else if (token.type === 'Simbolo') {
            if(token.value==="{"){/////////////////////////////////////////////////////////
                
                cont++;
                codigo+= token.value +'<br/>'

                for(let i=0;i<=cont;i++){
                    codigo+=space;
                }
            }
            else if(token.value ===';'){
                
                codigo += token.value + '<br/>';
            
            }else if(token.value==="}"){
                cont--;
                codigo+= token.value +'<br/>';
                for(let i=0;i<=cont;i++){
                    codigo+=space;
                }
            }
            else{
                codigo += token.value + ' ';
            }
            // Si el tipo es "Simbolo", agrega el valor del token al código
            
        } else {
            // Si el tipo no es reconocido, emite un error
            throw new Error('Tipo de token no válido: ' + token.type);
        }
    });

    return codigo // Elimina los espacios en blanco sobrantes al final del código
}


function GenerarCode(token){
const codigoGenerado = generarCodigo(token);
console.log('Código generado:');
console.log(codigoGenerado);

const elem_res_generate=document.getElementById('result_generate');

elem_res_generate.innerHTML=codigoGenerado;

// document.getElementById('result_generate').textContent = JSON.stringify(codigoGenerado, null, 2);

}