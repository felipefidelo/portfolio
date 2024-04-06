const fs = require('fs'); // Importa o módulo 'fs' para trabalhar com arquivos no Node.js
const http = require('http'); // Importa o módulo 'http' para criar o servidor

// Função para lidar com requisições HTTP
const server = http.createServer((req, res) => {
    // Configura cabeçalhos da resposta HTTP
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Servidor rodando na porta 3000!');
});

// Inicia o servidor na porta 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Lida com o envio do formulário
server.on('request', (req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = JSON.parse(body);

            // Lê o arquivo data.json (se existir), ou cria um novo array vazio
            let dataArray = [];
            try {
                dataArray = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
            } catch (err) {
                console.error('Erro ao ler arquivo JSON:', err);
            }

            // Adiciona os novos dados ao array
            dataArray.push(formData);

            // Escreve os dados atualizados de volta no arquivo JSON
            fs.writeFile('data/data.json', JSON.stringify(dataArray, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever arquivo JSON:', err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Erro interno do servidor.');
                } else {
                    console.log('Dados salvos com sucesso.');
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(dataArray));
                }
            });
        });
    }
});
