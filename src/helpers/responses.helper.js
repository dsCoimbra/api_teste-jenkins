const { log } = require('../helpers/functions.helper');
    const DateTime = require('node-datetime/src/datetime');
    
    module.exports = {
        responses(req, res, status, data, msg, service){
            let type = ''
            let resp = ''
            console.log(status)
            switch (status) {
                case 200:
                case 201:
                    console.log(req.method)
                    switch (req.method) {
                        case 'GET':
                        case 'PUT':
                        case 'DELETE':
                        case 'POST':
                            type = 'SUCCESS'
                            resp = data
                            break;                
                        default:
                            break;
                    }
                    break;
                case 400:
                case 500:
                    switch (req.method) {
                        case 'GET':
                        case 'POST':
                        case 'PUT':
                        case 'DELETE':
                            type = 'ERROR'
                            resp = 'error'
                            break;                
                        default:
                            break;
                    }
                    break;
                case 404:
                    switch (req.method) {
                        case 'PUT':
                        case 'DELETE':
                            type = 'ERROR'
                            resp = []
                            break;                
                        default:
                            break;
                    }
                    break;
                default:
                    break;
                }
            log(service, msg, type)
            return res.status(status).send({
                data: resp,
                message: msg
            })
        }
    }