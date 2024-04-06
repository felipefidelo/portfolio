const fs = require('fs'); // Importa o módulo 'fs' para trabalhar com arquivos no Node.js

document.getElementById('formData').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    
    const data = {
        name: name,
        age: age
    };

    // Lê o arquivo data.json (se existir), ou cria um novo array vazio
    let dataArray = [];
    try {
        dataArray = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
    } catch (err) {
        console.error('Erro ao ler arquivo JSON:', err);
    }

    // Adiciona os novos dados ao array
    dataArray.push(data);

    // Escreve os dados atualizados de volta no arquivo JSON
    fs.writeFile('data/data.json', JSON.stringify(dataArray, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Erro ao escrever arquivo JSON:', err);
        } else {
            console.log('Dados salvos com sucesso.');
        }
    });

    // Limpa os campos do formulário após enviar
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
});