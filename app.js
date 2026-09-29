const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');
const MEDIA_MINIMA = 6.0;

const contentTypes = {
    '.html':    'text/html; charset=utf-8',
    '.css':     'text/css; charset=utf-8',
    '.js':      'text/javascript; charset=utf-8',
    '.json':    'application/json; charset=utf-8',
};


const paginasInternas = ['aprovado.html', 'reprovado.html', 'erro.html'];

function pagina404(response) {
    response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    fs.createReadStream(path.join(publicDir, 'erro404.html')).pipe(response);
}

function readFile(response, file, status, dados) {
    fs.readFile(file, function(err, data){
        if(err) return pagina404(response);

        var extension = path.extname(file).toLowerCase();
        var contentType = contentTypes[extension] || 'application/octet-stream';

        if (dados) {
            var html = data.toString('utf8');
            for (var chave in dados)
                html = html.split('{{' + chave + '}}').join(dados[chave]);
            data = html;
        }

        response.writeHead(status || 200, {'Content-Type': contentType});
        response.end(data);
    });
}

function erro(response, status, titulo, mensagem) {
    readFile(response, path.join(publicDir, 'erro.html'), status, {
        STATUS: status,
        TITULO: titulo,
        MENSAGEM: mensagem
    });
}

function converterNota(valor) {
    if (typeof valor !== 'string') return null;
    var texto = valor.trim().replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(texto)) return null;
    return Number(texto);
}

function calcularMedia(response, query) {
    var p1Texto = query.p1;
    var p2Texto = query.p2;

    if (p1Texto === undefined || p2Texto === undefined || p1Texto === '' || p2Texto === '')
        return erro(response, 400, 'Notas não informadas',
            'Informe P1 e P2 na URL. Exemplo: /media?p1=7.5&p2=5.0');

    var p1 = converterNota(p1Texto);
    var p2 = converterNota(p2Texto);

    if (p1 === null || p2 === null)
        return erro(response, 400, 'Valores inválidos',
            'P1 e P2 devem ser números, por exemplo 7.5 ou 5.0.');

    // Fora do intervalo
    if (p1 > 10 || p2 > 10)
        return erro(response, 400, 'Notas fora do intervalo',
            'As notas devem estar entre 0 e 10.');

    var media = (p1 + p2) / 2;
    var aprovado = media >= MEDIA_MINIMA;

    readFile(response,
        path.join(publicDir, aprovado ? 'aprovado.html' : 'reprovado.html'),
        200,
        {
            P1: p1.toFixed(1),
            P2: p2.toFixed(1),
            MEDIA: media.toFixed(1),
            SITUACAO: aprovado ? 'APROVADO' : 'REPROVADO'
        });
}

var callback = function(request, response) {
    var parsed = url.parse(request.url, true);
    var pathname;

    try {
        pathname = decodeURIComponent(parsed.pathname);
    } catch (e) {
        return pagina404(response);
    }

    if (pathname === '/media')
        return calcularMedia(response, parsed.query);

    var file = path.join(publicDir, pathname);

    if (!file.startsWith(publicDir + path.sep) ||
        paginasInternas.includes(path.basename(file)))
        return pagina404(response);

    readFile(response, file);
}

var server = http.createServer(callback);
server.listen(3000);
console.log(`Servidor iniciado em http://localhost:3000/ ...`)