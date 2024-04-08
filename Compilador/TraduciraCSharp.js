function traducirJsACSharp(jsCode) {
    const csharpCode = jsCode
        .replace(/var\s+(\w+)\s*=\s*(.*?);/g, 'var $1 = $2;') 
        .replace(/let\s+(\w+)\s*=\s*(.*?);/g, 'var $1 = $2;') 
        .replace(/const\s+(\w+)\s*=\s*(.*?);/g, 'const $1 = $2;') 
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*{([\s\S]*?)}/g, 'public void $1($2) {$3}') 
        .replace(/console.log\((.*?)\);/g, 'Console.WriteLine($1);'); 
    return csharpCode;
}


function GenerarCSharp(){   
    const code = document.getElementById('code').value;
    const codigoCSharp = traducirJsACSharp(code);
    console.log('Código C#:', codigoCSharp);
    document.getElementById('result_cSharp').textContent = codigoCSharp;
    
}

