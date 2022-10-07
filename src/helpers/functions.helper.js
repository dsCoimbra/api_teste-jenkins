let jwt = require('jsonwebtoken')
    const fs = require('fs');
    const SecretToken = process.env.JWT_SECRET;
    const dateTime = require('node-datetime')
    
    // Função de leitura de arquivo na persistência
    function lerArquivoPersistencia(path) {
        try {
            let cache = JSON.parse(fs.readFileSync(path));
            return cache;
        } catch (error) {
            console.info('Erro ao ler arquivo na persistencia', path);
            return false;
        }
    }
    
    // Função de verificar tojen JWT
    function verifyJWT(req, res, next) {
    
        const authHeader = req.headers['authorization'];
    
        try {
            if (authHeader != null) {
                const verificacao = jwt.verify(authHeader, SecretToken);
    
                if (verificacao) {
                    next();
                } else {
                    res.status(401).json({ auth: false, message: "Token inválido" });
                }
            } else {
                console.info("Não passou o token", authHeader);
                return res.status(401).send({ auth: false, message: "Token não informado" });
            }
        } catch (error) {
            console.info("Erro ao capturar token no Headers", error);
            return res.status(500).send({ auth: false, message: "Erro ao capturar token no Headers ou token vencido" });
        }
    }
    
    function json(res, status, obj) {
        return res.status(status).send(obj);
    }
    
    function dataHora(type) {    
        let dt = dateTime.create();
        switch (type) {
            case 'data':
                try {
                    let dataFormatada = dt.format("d/m/Y");
                    return dataFormatada;
                } catch (error) {
                    console.info("Falha ao capturar a data/hora atual");
                    return false;
                }
            case 'hora':
                try {
                    let dataFormatada = dt.format("H:M:S");
                    return dataFormatada;
                } catch (error) {
                    console.info("Falha ao capturar a data/hora atual");
                    return false;
                }
            default:
                try {
                    let dataFormatada = dt.format("d/m/y H:M:S");
                    return dataFormatada;
                } catch (error) {
                    console.info("Falha ao capturar a data/hora atual");
                    return false;
                }
        }
    }
    
    function log(item, msg, tipo, ...extras) {
        let app_name = process.env.APPNAME
        if (!tipo) {
            tipo = 'ERRO';
        }
        const dataMsg = `[${dataHora()}] | [${app_name}][${item}][${tipo}]: ${msg}`;
        if (extras.length > 0) {
            console.info(dataMsg, extras);
        } else {
            console.info(dataMsg);
        }
    }
    
    function formatDate(date, format){
        let dt = dateTime.create(date)
        let result = dt.format(format)
    
        return result
    }
    
    module.exports = {
        verifyJWT,
        lerArquivoPersistencia,
        dataHora,
        log,
        formatDate
    }