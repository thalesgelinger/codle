# Codle: your daily code challenges

The idea is like wordle, but for code (Very creative name, i know), but basically, everyday a new coding challenge is deployed, you have only 3 chances to make the right guess

## Technologies

This project works with very interesting technologies, 

- Astro: for static pages
- React: because i know i wanted to make it faster
- Shadcn/ui: a tailwind component library very easy to use
- Webcontainer: this was fun, it runs node on browser, but not just it, we can run also TS and python, next steps are about adding new language options, but today is just for JS

## Want to add challenges to this repo, here's how you can do this

There's a repo called `challenges` and it follows a very simples structure

It's just a folder with a number for the challenge and then a test file

challenges/
├── 1
│   └── test.js
└── 2
    └── test.js

For creating new challenges, you just need to submit a PR with a new challenge in a folder with the next number, and a file following this format


``` js 
export const challenge = {
    id: 1, // Should be same as challenge number
    title: "", // Them title for the challenge
    description: "", // A brifely description for this challenge
    example: "", // Some example of what the code should do
    requirement: "", // What is required that code to do
    tests: runTests.toString() // JS allow as to convert functions as string to get declaration, so, it MUST have this name, runTests
}


function runTests() { // THis functino is what is executed for testing the challenge
    // the error function is available by default in our project, 
    // the solve is what runs, you must consider that your challenge need to accept a parameter and return something
    // here you can right as many tests as possible using this if pattern 
    // (is not the best, but it works, hehe, probably will update to jest in future)
    if (solve(123) === false) error("Test failed") 
}

```

#### Otherwise if you want just to play, please enjoy, codle.fun

