function traducirJsACSharp(jsCode) {
    const csharpCode = jsCode
        .replace(/var\s+(\w+)\s*=\s*(.*?);/g, 'var $1 = $2;') // Traduce declaraciones de variables
        .replace(/let\s+(\w+)\s*=\s*(.*?);/g, 'var $1 = $2;') 
        .replace(/string\s+(\w+)\s*=\s*(.*?);/g, 'string $1 = $2;') 
        .replace(/const\s+(\w+)\s*=\s*(.*?);/g, 'const $1 = $2;') 
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*{([\s\S]*?)}/g, 'public void $1($2) {$3}') // Traduce definiciones de funciones
        .replace(/console.log\((.*?)\);/g, 'Console.WriteLine($1);'); // Traduce llamadas a console.log

    return csharpCode;
}


function GenerarCSharp(){   
    const code = document.getElementById('code').value;
    const codigoCSharp = traducirJsACSharp(code);
    console.log('Código C#:', codigoCSharp);
    document.getElementById('result_cSharp').textContent = codigoCSharp;
    
}

