# avion

A small XMLHttpRequest wrapper that uses promises to wrap the calls.

To install:

```js
npm install avion
```

Importing

```js
import avion from 'avion';
```

GET usage:

```js
avion({
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
avion({
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
avion({
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

Also, the newest additions are the basic implementations:
This demo uses just vanilla javascript

```js
// Basic GET
const btn3 = document.getElementById('btn3');
btn3.addEventListener('click', () => {
  debugger;
  avion
    .get('http://localhost:3000/users')
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log('error', e);
    });
});

// Basic POST
const btn4 = document.getElementById('btn4');
btn4.addEventListener('click', () => {
  avion
    .post('http://localhost:3000/users', {
      name: 'mike',
      age: 47,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log('error', e);
    });
});

// Basic PUT
const btn5 = document.getElementById('btn5');
btn5.addEventListener('click', () => {
  avion
    .put('http://localhost:3000/users/1', {
      name: 'mike',
      age: 45,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log('error', e);
    });
});

// Basic Delete
const btn6 = document.getElementById('btn6');
btn6.addEventListener('click', () => {
  debugger;
  avion
    .del('http://localhost:3000/users', 5)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log('error', e);
    });
});
```
