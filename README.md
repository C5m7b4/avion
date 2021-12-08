# avion

A small XMLHttpRequest wrapper that uses promises to wrap the calls.

To install:

```js
npm install avion
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
