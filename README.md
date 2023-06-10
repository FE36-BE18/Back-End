# Doc API - D'care App

---

## User

- **Register** (`POST`) : https://back-end-production-643c.up.railway.app/user/register

  ```json
  // body
  {
    "name": "String",
    "email": "String",
    "password": "String",
    "gender": "String"
  }
  ```

  **Password** min 6 Character

- **Login** (`POST`) : https://back-end-production-643c.up.railway.app/user/login

  ```json
  // body
  {
    "email": "String",
    "password": "String"
  }
  ```

- **Get User By Id** (`GET`) : https://back-end-production-643c.up.railway.app/user/:id

  ```json
  // header
  {
    "authuser": "token"
  }
  ```

  **Get User by Id** need token from Login to get Access

- **Get All User** (`GET`) : https://back-end-production-643c.up.railway.app/user/

  ```json
  // header
  {
    "authuser": "token"
  }
  ```

  **Get All User** need token from Login with role **Admin** to get Access

- **Update User by Id** (`PUT`) : https://back-end-production-643c.up.railway.app/user/:id

  ```json
  // header
  {
    "authuser": "token"
  }
  // body
  {
    "name" : "string",
    "password" : "string",
    "gender" : "string"
  }
  ```

- **Delete User by Id** (`DELETE`) : https://back-end-production-643c.up.railway.app/user/:id
