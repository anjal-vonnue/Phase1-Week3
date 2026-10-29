//link: https://www.freecodecamp.org/news/javascript-post-request-how-to-send-an-http-post-request-in-js/
//link: https://medium.com/@AlexanderObregon/canceling-fetch-requests-in-javascript-with-abortcontroller-98c11d2ab54e

const response = fetch("https://jsonplaceholder.typicode.com/posts");

response.then((result) => {
  console.log("whole response: ", result);
  console.log("response status: ", result.status);
  console.log("response header: ", result.headers);
});

// custom class

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

const url = "https://jsonplaceholder.typicode.com/posts";

function fetchJSON(url, options) {
  const res = fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new HttpError(response.status, "HTTP ERROR");
    }
    return response.json();
  });

  return res;
}

fetchJSON(url, {})
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

//post method
const options = {
  method: "POST",
  body: JSON.stringify({
    userId: 7,
    title: "i am ronaldo",
    body: "greatest of all time",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

fetchJSON(url, options)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//abortcontroller

let controller = new AbortController();

setTimeout(() => {
  controller.abort();
}, 5000);

fetchJSON(url, {
  signal: controller.signal,
})
  .then((data) => {
    console.log("controller: ", data);
  })
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Aborted");
    } else {
      console.log("NOT ABORT ERROR: ", error);
    }
  });
