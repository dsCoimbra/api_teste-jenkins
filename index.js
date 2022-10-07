const express = require("express");
const routes = require("./src/routes/index.routes");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const app = express();
const portaExec = process.env.PORT;

const swaggerConfig = {
  definition: {
      openapi: '3.0.0',
      info: {
          title:"api_teste-jenkins", 
          description:"Api para testar o Jenkins",
          contact: {
              email:"ds.coimbra96@gmail.com"
          },
          version:"1.0.0"
      },
      servers: [
              {
                  url:"http://localhost:3013/api",
                  description:"API - Local"
              },
            //   {
            //       url:"http://api-autoatendimentoteste.haoc.net/api",
            //       description:"API - Homologação"
            //   },
            //   {
            //       url:"https://api-autoatendimento.haoc.com.br/api",
            //       description:"API - Produção"
            //   }
          ],
      externalDocs: {
          description: 'Leia mais sobre a api_teste-jenkins',
          url: 'https://github.com/hospitalalemao/api_teste-jenkins'
      },
  },    
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerConfig)

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.get('/api-doc-json', (req, res) => {
  res.json(swaggerDocs).status(200)
})

/*** Security ***/
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameAncestors: ['app://*', 'http://localhost:*'],
      },
    },
    frameguard: false,
  }),
);

// Carregamento das rotas  
  app.use(routes)

app.listen(portaExec, () => console.log('========== APLICAÇÃO RODANDO =========='))
