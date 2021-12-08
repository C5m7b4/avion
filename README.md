# avion

A small XMLHttpRequest wrapper that uses promises to wrap the calls.

To install:

```js
npm install avion
```

Importing

```js
import Avion from 'avion';
```

GET usage:

```js
Avion({
  method: 'GET',
  url: 'https://reqres.in/api/users',
})
  .then((response) => {
    console.log('here is my response');
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

POST usage:

```js
Avion({
  method: 'POST',
  url: 'https://reqres.in/api/register',
  data: {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

Post usage to send Tokens received after logging into an API:

```js
Avion({
  method: 'GET',
  url: 'http://localhost:8080/users',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer asdfasdfasdfasdfasdfasdf',
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

Also supports setting the responseType

```js
responseType: 'blob';
responseType: 'arraybuffer';
```
