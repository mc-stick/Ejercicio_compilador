function Ejecutar() {

    const list_results = document.getElementById("resultado_content");

      list_results.innerHTML = `<div class="result_share result_lex">
      <h2>Analisis Lexico</h2>
      <pre id="result_lex"></pre>
    </div>
    <div class="result_share result_sintax">
      <h2>Analisis sintactico</h2>
      <pre id="result_sintax"></pre>
    </div>

    <div class="result_share table">
      <h2>Tabla de Símbolos</h2>
      <table border="1">
        <thead>
          <tr>
            <th style="align-items: center">Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody id="tabla_simbolos_body"></tbody>
      </table>
    </div>

    <div  class="result_share result_generate">
    <h2>Codigo Generado</h2>
    <pre style=" text-align:left;
   " id="result_generate"></pre>
  </div>

    `;
    
  
   Ejecutar_lexico();

      const code = document.getElementById('code').value;
    const result = Sintax_function(code);
    document.getElementById('result_sintax').textContent = JSON.stringify(result, null, 2);
    
    GenerarCSharp();
    
    
  }
    
  
  
  function Sintax_function(code) {
    const functionRegex = /function\s+([a-zA-Z_$][\w$]*)\s*\(([^)]*)\)\s*{([^}]*)}/g;
    const Funciones = [];
    let coincide;
  
    while ((coincide = functionRegex.exec(code)) !== null) {
      const functionName = coincide[1];
      const Parametro = coincide[2].split(',').map(param => param.trim());
      const Cuerpo = coincide[3].trim();
      Funciones.push({ Nombre_de_la_funcion: functionName, Parametro, Cuerpo });
    }
  
    
    const V_declaraciones = /(\blet\b|\bconst\b|\bvar\b)\s+([a-zA-Z_$][\w$]*)/g;
    const ifEstados = /if\s*\(([^)]*)\)\s*{([^}]*)}\s*(?:else\s*{([^}]*)})?/g;
  
  
    let variables = [];
    let variableMatch;
  
    while ((variableMatch = V_declaraciones.exec(code)) !== null) {
      const dataType = variableMatch[1];
      const variableName = variableMatch[2];
      variables.push({ dataType, variableName });
    }
  
    let Sentencias = [];
    let sentencia;
  
    while ((sentencia = ifEstados.exec(code)) !== null) {
      const condicion = sentencia[1].trim();
      const EsVerdadero = sentencia[2].trim();
      const EsFalso = sentencia[3] ? sentencia[3].trim() : null;
  
      Sentencias.push({ Tipo_Sentencia: 'if y Else', condicion, EsVerdadero, EsFalso });
    }
    
  
    return { Funciones, variables, Sentencias };
  }
  