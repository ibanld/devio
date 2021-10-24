# 🍕 Restaurante Cinque Terre (Devio Backend Test)
## ⭐ Caracteristicas
- Status de pedidos em tempo real
- Tela de destino do usuário dependendo da função do trabalho
- Lista de mesas disponíveis, mesas ocupadas e mesas servidas pelo usuário para acesso rápido
- A tela de pedidos é atualizada em tempo real para que o usuário saiba quando um produto está pronto para pegar
- Tela de informações do pedido para atualizar rapidamente a quantidade de produtos
- Acesso rápido à lista de produtos mais vendidos no menu de pesquisa para pedidos
- Design amigável na tela da cozinha para definir facilmente os produtos como prontos para pegar
- Menu de administração para gerenciar usuários, produtos e lista de mesas disponíveis
- Mais outras características legais para te surpreender!
#### 🌐 [Aplicativo implantado para teste](https://cinqueterre.herokuapp.com)
### ⚙️ Características de Backend
#### 🔧 Tecnologias
- Bcryptjs
- Body-parser
- Cors
- Dotenv
- Express
- MongoDB
- Mongoose
- Socket-IO

_Dependencias desenvolvemento_
- Concurrently
- Nodemon
#### Endpoints de rotas API
__Orders__
> GET https:/yourhost.com.br/api/orders/

> GET https:/yourhost.com.br/api/orders/:id

> POST https:/yourhost.com.br/api/orders/

> PUT https:/yourhost.com.br/api/orders/:id

> DELETE https:/yourhost.com.br/api/orders/:id

__Products__
> GET https:/yourhost.com.br/api/products/

> POST https:/yourhost.com.br/api/products/

> GET https:/yourhost.com.br/api/products/:id

> PUT https:/yourhost.com.br/api/products/:id

> DELETE https:/yourhost.com.br/api/products/:id

__Users__
> POST https:/yourhost.com.br/api/users/register/

> POST https:/yourhost.com.br/api/users/login/

> GET https:/yourhost.com.br/api/users/

> GET https:/yourhost.com.br/api/users/:id

> PUT https:/yourhost.com.br/api/users/:id

> DELETE https:/yourhost.com.br/api/users/:id

### 🖥️ Características de Frontend
### 🔧 Tecnologias
- Axios
- ReactJS
- React Moment
- Semantic UI
- Socket-IO (client)
#### 🔩 Instalação
1. Copie o repositório em sua máquina local
> git clone https://github.com/ibanld/devio.git

2. Instale as dependencias do projecto 
> npm install

3.  Crie um arquivo .env na pasta raiz
> touch .env 

4. Adicione a variável de ambiente

> MONGO_DB_URI=your-mongo-db-uri

5. Execute o servidor e o cliente ou execute ambos ao mesmo tempo

Servidor
> npm run server

Cliente
> npm run client

Servidor e cliente
> npm run dev

6. Criar um usuário no banco de dados MongoDB
7. Abra seu navegador e vá para:
> localhost: 3000 

8. Faça login com o usuário criado anteriormente