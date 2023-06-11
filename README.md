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

---

## Level

- **Get All Level** (`GET`) : https://back-end-production-643c.up.railway.app/level

- **Get Level By Id** (`GET`) : https://back-end-production-643c.up.railway.app/level/:id

- **Create Level** (`POST`) : https://back-end-production-643c.up.railway.app/level
  ```json
  // header
  {
    "authuser" : "token"
  }
  // body
  {
    "name" : "String"
  }
  ```
  To create level data need access from user with role as "**Admin**"
- **Update Level** (`PUT`) : https://back-end-production-643c.up.railway.app/level/:id

  ```json
  // header
  {
    "authuser" : "token"
  }
  // body
  {
    "name" : "String"
  }
  ```

  To update level data need access from user with role as "**Admin**"

- **Delete Level** (`DELETE`) : https://back-end-production-643c.up.railway.app/level/:id
  ```json
  // header
  {
    "authuser": "token"
  }
  ```
  To update level data need access from user with role as "**Admin**"

---

## Category

- **Get All Category** (`GET`) : https://back-end-production-643c.up.railway.app/category

- **Get Category By Id** (`GET`) : https://back-end-production-643c.up.railway.app/category/:id

- **Create Category** (`POST`) : https://back-end-production-643c.up.railway.app/category

  ```json
  // header
  {
    "authuser": "token"
  }

  // body
  {
    "name": "String"
  }
  ```

  To create category data need access from user with role as "**Admin**"

- **Update Category** (`PUT`) : https://back-end-production-643c.up.railway.app/category:/id

  ```json
  // header
  {
    "authuser": "token"
  }

  // body
  {
    "name": "String"
  }

  ```

  To create category data need access from user with role as "**Admin**"

- **Delete Category** (`DELETE`) : https://back-end-production-643c.up.railway.app/category:/id
  ```json
  // header
  {
    "authuser": "token"
  }
  ```
  To create category data need access from user with role as "**Admin**"

---

## Food

- **Get All Food** (`GET`) : https://back-end-production-643c.up.railway.app/food/

- **Get Food By Id** (`GET`) : https://back-end-production-643c.up.railway.app/food/:id

- **Create Food** (`POST`) : https://back-end-production-643c.up.railway.app/food/

  ```json
  // header
  {
    "authuser" : "token"
  }
  // body
  {
    "name" : "String",
    "img": "String" ,
    "calory" : Int,
    "proteins": Int,
    "carbo": Int,
    "fat": Int,
    "carbon": Int,
    "calLevel": "648162cedcd145bcd3d8e269",
    "category": "64815da89d50c94fc7756137"
  }
  ```

  **callevel** and **category** is an Object ID, get form collection **level** and **category**

  To create food data need access from user with role as "**Admin**"

- **Update Food** (`PUT`) : https://back-end-production-643c.up.railway.app/food/:id

  ```json
  // header
  {
    "authuser" : "token"
  }
  // body
  {
    "name" : "String",
    "img": "String" ,
    "calory" : Int,
    "proteins": Int,
    "carbo": Int,
    "fat": Int,
    "carbon": Int,
    "calLevel": "648162cedcd145bcd3d8e269",
    "category": "64815da89d50c94fc7756137"
  }
  ```

  **callevel** and **category** is an Object ID, get form collection **level** and **category**

  To update food data need access from user with role as "**Admin**"

- **Delete Food** (`DELETE`) : https://back-end-production-643c.up.railway.app/food/:id
  ```json
  {
    "authuser": "token"
  }
  ```
  To delete food data need access from user with role as "**Admin**"
