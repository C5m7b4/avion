# avion

![GitHub](https://img.shields.io/github/license/C5m7b4/avion?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/C5m7b4/avion?style=plastic)
![GitHub package.json version](https://img.shields.io/github/package-json/v/C5m7b4/avion?style=plastic)

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

For Typescript usage here is an example of a simple GET request:

```js
import avion, { AvionResult } from 'avion';

const getCourses = async (): Promise<AvionResult> => {
  return await avion.get('http://localhost:3001/courses');
};

const btn7 = document.getElementById('btn7');
const resultDiv = document.getElementById('results');
btn7.addEventListener('click', async () => {
  getCourses().then((response) => {
    if (response.ok) {
      resultDiv.innerHTML = JSON.stringify(response.data);
    } else {
      resultDiv.innerHTML = response.statusText;
    }
  });
});
```

## Newest feature (avion hook)

### useAvion()

usage:

```js
  const [data, error, isLoading] = useAvion('http://localhost:3001/courses')

```

This is partly dependant on the shape of what you are getting back from your api. I always return something like this from my apis (always in .NET core):

```js
return Ok(new {
  error = 0,
  success = true,
  data
})
```

In this example, data would be an array of the data that this endpoint generates, so the hook will do a forEach on the response to return an array of the key that is not error or success. Then the body of the component could look something like this:

```js
{isLoading ? (<div className="loader">Loading...</div>) : null}
{error && (<div className="error">{error}</div>)}
{data && data.length > 0 ? 
  (
    <div>
      {data.map((d, i) => (
        <div key={`course-${i}`}>
          <span>{d.courseName}</span>
          <span>{d.attendees}</span>
        </div>
      ))}
    </div>
  ) : 
  (
    <div>There are no records to display</div>
  )}

```

Arguments to the hook look like this:

```js
  url: string,
  method: VERB = 'GET',
  headers = { 'Content-Type': 'application/json' },
  responseType: ResponseType = 'json',
  args: any

```

Say you want to post a form-type response and use the hook. This is what that would look like:
(note the Content-Type)

```js
import {useAvion, stringify} from 'avion';

...
const [data, error, isLoading] = useAvion(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: stringify({
      Id: 1,
      firstName: "mike",
      lastName: "bedingfield",
    }),
  });

```

Normally you would use another third party library like qs, but we build stringify into the avion package so you can just use the built in stringify function;

Then just to clarify what the backend should look like if you are using .NET core:

```js
namespace MikToApi.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

    }
}

[HttpPost]
[AllowAnonymous]
[Route("post")]
public ActionResult PostSomeData([FromForm] Test test)
{
    try
    {             

        if ( test.Id != 0)
        {
            return Ok(new
            {
                error = 0,
                success = true,
                test
            });
        }
        else
        {
            return Ok(new
            {
                error = 2,
                success = false
            });
        }
        
    }
    catch (Exception)
    {
        return Ok(new
        {
            error = 1,
            success = false,
            msg = "An internal error occured"
        });
    }
}

```

An alternative to posting to the Form would be post to the Body and that would look like this:
(note the Content-Type and we are not using stringify on the data parameter)

```js

async function bodyPost() {
  let json = await avion({
    method: "POST",
    cors: true,
    headers: {
      "Content-Type": "application/json",
    },
    url: "https://localhost:44354/api/interview/bodypost",
    data: {
      id: 1,
      firstName: "mike",
      lastName: "bedingfield",
    },
  });
  return json;
}

```

And the backend would look like this:

```js
[HttpPost]
[AllowAnonymous]
[Route("bodypost")]
public ActionResult BodyPostSomeData([FromBody] Test test)
{
    try
    {

        if (test.Id != 0)
        {
            return Ok(new
            {
                error = 0,
                success = true,
                test
            });
        }
        else
        {
            return Ok(new
            {
                error = 2,
                success = false
            });
        }

    }
    catch (Exception)
    {
        return Ok(new
        {
            error = 1,
            success = false,
            msg = "An internal error occured"
        });
    }
}
```

Now, let's say that you want to use the hook for a PUT request. Here is what that looks like when using FromForm:

```js
import { useAvion, stringify } from "avion";


const [data, error, isLoading] = useAvion(
    "https://localhost:44354/api/interview/formput",
    {
      method: "PUT",
      cors: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: stringify({
        id: 1,
        firstName: "mike",
        lastName: "bedingfield",
      }),
    }
  );

```

And the backend will look like this:

```js

[HttpPut]
[AllowAnonymous]
[Route("formput")]
public ActionResult PutFormTest([FromForm] Test test)
{
    try
    {
        if ( test.Id != 0)
        {
            return Ok(new
            {
                error = 0,
                success = true,
                test
            });
        }
        else
        {
            return Ok(new
            {
                error = 2,
                success = false,
                msg = "Missing Id"
            });
        }
    }
    catch (Exception)
    {
        return Ok(new
        {
            error = 1,
            success = false,
            msg = "An internal error occured"
        });
    }
}

```
