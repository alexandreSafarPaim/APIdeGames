# APIdeGames

API Rest criada no curso Formação Node.js utilizada para gerenciar uma lista de games.

- Originalmente o projeto utiliza um Mock DB para testar o CRUD dos games
- O Mock foi substituído por um bando de dados SQLite ( O motivo de se escolher o SQLite foi apendas para estudo, pois era um banco de dados ainda não trabalhado por mim )
- Foi adicionado uma tabela de usuários para poder trabalhar com autenticação
- O método de autenticação escolhido foi o Jsonwebtoken.
- Foi adicionado um sistema simples de login por refresh token

------



## Como usar a autenticação

- Faça o login usando os endpoints de [Autenticação](#auth)

- Com o token gerado envie-o nas requisições que exigem autenticação

- Ele deve ser enviado no header da requisição pelo parâmetro **Authorization**

- O token tem que vir precedido da palavra **Bearer** 

  ```
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTYwNjU5LCJleHAiOjE2MjA2NDcwNTl9.a_VjK4V-7WBhjgpyd46g3qfyp6De0mP4AoKiXO-LjOI
  ```

  


## Endpoints

### User

#### Read
```http
GET /user
```
[Autenticação](#auth)

##### Resposta
Lista todos os usuários cadastrados

```json
[
  {
    "id": 1,
    "name": "Nome",
    "email": "nome@email.com",
    "createdAt": "2021-05-09T11:17:46.511Z",
    "updatedAt": "2021-05-09T11:17:56.995Z"
  }
]
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 401 | `No token provided` \|`Token malformatted` \| `Invalid token` |
| 500 | `Database Error` |

------



#### Create
```http
POST /user
```

##### Parametros
| Json | Tipo | Descrição |
| :--- | :--- | :--- |
| `name` | `string` | **Necessário** |
| `email` | `string` | **Necessário** |
| `password` | `string` | **Necessário** |

##### Resposta
Cadastra um novo usuário

```json
[
  {
    "id": 1,
    "name": "Nome",
    "email": "nome@email.com",
    "createdAt": "2021-05-09T11:17:46.511Z",
    "updatedAt": "2021-05-09T11:17:56.995Z"
  }
]
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 400 | `Some information undefined` |
| 500 | `Database Error` |

------



#### Delete
```http
DELETE /user/:id
```
[Autenticação](#auth)

##### Parametros
| Params | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `integer` | **Necessário** Id do usuário que será deletado|

##### Resposta
Deleta um usuário cadastrado de acordo com o id fornecido por parâmetro

```json
{
  "message": "User has been deleted"
}
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 400 | `ID must be a the numeric type` |
| 401 | `No token provided` \|`Token malformatted` \| `Invalid token` |
| 404 | `User not found` |
| 500 | `Database Error` |

------



### Game

#### Read
```http
GET /games
```

##### Resposta
Lista todos os games cadastrados

```json
[
  {
    "id": 1,
    "title": "Jogo",
    "year": 2021,
    "price": 100,
    "createdAt": "2021-05-07T18:45:18.161Z",
    "updatedAt": "2021-05-07T18:47:20.954Z"
  }
]
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |

------



#### Read /Id
```http
GET /games/:id
```

##### Parametros
| Params | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `integer` | **Necessário** Id do game procurado|

##### Resposta
Lista o games de acordo com o id passado por parâmetro

```json
[
  {
    "id": 1,
    "title": "Jogo",
    "year": 2021,
    "price": 100,
    "createdAt": "2021-05-07T18:45:18.161Z",
    "updatedAt": "2021-05-07T18:47:20.954Z"
  }
]
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 400 | `ID must be a the numeric type` |
| 404 | `Game not found` |


------



#### Create
```http
POST /games
```
[Autenticação](#auth)

##### Parametros
| Json | Tipo | Descrição |
| :--- | :--- | :--- |
| `title` | `string` | **Necessário** |
| `year` | `integer` | **Necessário** |
| `price` | `integer` | **Necessário** |

##### Resposta
Cadastra um novo game

```json
[
  {
    "id": 1,
    "title": "Jogo",
    "year": 2021,
    "price": 100,
    "createdAt": "2021-05-07T18:45:18.161Z",
    "updatedAt": "2021-05-07T18:47:20.954Z"
  }
]
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 500 | `Database Error` |

------



#### Delete
```http
DELETE /games/:id
```
[Autenticação](#auth)

##### Parametros
| Params | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `integer` | **Necessário** Id do game que será deletado|

##### Resposta
Deleta um game cadastrado de acordo com o id passado por parâmetro

```json
{
  "message": "Game has been deleted"
}
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 400 | `ID must be a the numeric type` |
| 401 | `No token provided` \|`Token malformatted` \| `Invalid token` |
| 404 | `User not found` |

------



#### Edit
```http
PUT /games/:id
```
[Autenticação](#auth)

##### Parametros
| Params | Tipo | Descrição |
| :--- | :--- | :--- |
| `title` | `string` | **Necessário** |
| `year` | `integer` | **Necessário** |
| `price` | `integer` | **Necessário** |

##### Resposta
Edita um game cadastrado de acordo com o id passado por parâmetro

```json
[
  {
    "id": 1,
    "title": "Jogo",
    "year": 2021,
    "price": 100,
    "createdAt": "2021-05-07T18:45:18.161Z",
    "updatedAt": "2021-05-07T18:47:20.954Z"
  }
]
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 400 | `ID must be a the numeric type` |
| 401 | `No token provided` \|`Token malformatted` \| `Invalid token` |
| 404 | `User not found` |

------



<a name="auth"></a>

### Autenticação

#### Login
```http
POST /auth
```

##### Parametros
| Json | Tipo | Descrição |
| :--- | :--- | :--- |
| `email` | `string` | **Necessário** |
| `password` | `string` | **Necessário** |

##### Resposta
Gera um token para ser utilizado como autenticação e um refresh token

```json
{
  "user": {
    "id": 1,
    "name": "Nome",
    "email": "email@email.com",
    "createdAt": "2021-05-09T11:17:46.511Z",
    "updatedAt": "2021-05-09T11:44:03.123Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTYwNjU5LCJleHAiOjE2MjA2NDcwNTl9.a_VjK4V-7WBhjgpyd46g3qfyp6De0mP4AoKiXO-LjOI",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjA1NjA2NTksImV4cCI6MTYyMDY0NzA1OX0.1MWzHlzoSB42qHZMsB7QDno7IsR6o6tKZevmCsJzesI"
}
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 401 | `No token provided` \|`Token malformatted` \| `Invalid token` |
| 404 | `User not found` |


------



#### Login /refresh token
```http
POST /refresh-auth
```

##### Parametros
| Json | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `integer` | **Necessário** |
| `refreshToken` | `string` | **Necessário** |

##### Resposta
Gera um novo token para ser utilizado como autenticação a partir de um refresh token

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTYwODMwLCJleHAiOjE2MjA1NjQ0MzB9.yh0E2RU8r9Fy5TuXuBgBmvvabkeXsad8t0QBK-W5-Gk",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjA1NjA2NTksImV4cCI6MTYyMDY0NzA1OX0.1MWzHlzoSB42qHZMsB7QDno7IsR6o6tKZevmCsJzesI"
}
```

##### Status Code

|Status Code | Descrição |
| :---- | :---- |
| 200 | `OK` |
| 401 | `No token provided` \|`Token malformatted` \| `Invalid token` |
| 404 | `User not found` |



