const express = require('express');    
const { verifyJWT } = require("../helpers/functions.helper.js");
const PessoaController = require("../controllers/pessoa.controller.js")

class Pessoa {
    constructor(app) {
        this.app = app
    }

    init() {
        /** 
         * @swagger
         * /pessoa:
         *  get:
         *      summary: Buscar Pessoa
         *      description: Rota para busca de todos Pessoa
         *      tags: ['Pessoa']
         *      responses:
         *          200:
         *              description: OK
         *          404:
         *              decription: Not Found
         *          500:
         *              description: Internal Error
         *  post:
         *      summary: Criar Pessoa
         *      description: Rota para criar Pessoa
         *      tags: ['Pessoa']
         *      requestBody:
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/PessoaRequest'
         *      responses:
         *          201:
         *              description: Created
         *          400:
         *              description: Bad Request
         *          500:
         *              description: Internal Error
        */
        this.app.route("/api/pessoa")
            .get(PessoaController.index)
            .post(PessoaController.create)

        
        /**
         * @swagger
         * /pessoa/{id}:
         *  get:
         *      summary: Buscar um Pessoa
         *      description: Rota para buscar um Pessoa por id.
         *      tags: ['Pessoa']
         *      responses:
         *          200:
         *              description: OK
         *          404:
         *              description: Not Found
         *          500:
         *              description: Internal Error
         *  put:
         *      summary: Editar um Pessoa
         *      description: Rota para editar um Pessoa por id.
         *      tags: ['Pessoa']
         *      requestBody:
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/PessoaResquest'
         *      responses:
         *          200:
         *              description: OK
         *          400:
         *              description: Bad Request
         *          404:
         *              description: Not Found
         *          500:
         *              description: Internal Error
         *  delete:
         *      summary: Editar um Pessoa
         *      description: Rota para editar um Pessoa por id.
         *      tags: ['Pessoa']
         *      responses:
         *          200:
         *              description: OK
         *          404:
         *              description: Not Found
         *          500:
         *              description: Internal Error
         */
        this.app.route("/api/pessoa/:id")
            .get(PessoaController.show)
            .put(PessoaController.update)
            .delete(PessoaController.delete)

        /**
         * @swagger
         * components:
         *  schemas:
         *      Request:
         *          type: object
         *          properties:
         *              exemplo:
         *                  type: string
         *      Response:
         *          type: object
         *          properties:
         *              data:
         *                  type: object
         *                  properties:
         *                      id:
         *                          type: integer
         *                      name:
         *                          type: string
         *              message:
         *                  type: string
         *      Error:
         *          type: object
         *          properties:
         *              data:
         *                  type: string
         *                  example: error
         *              message:
         *                  type: string
         */
    }
}

module.exports = Pessoa