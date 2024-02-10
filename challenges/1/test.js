
export const challenge = {
    title: "Spy number",
    description: "A Number is called SPY number if the sum and Product of its Digits are equal",
    example: " For Ex: 123 is a SPY Number, (1+2+3) = (1*2*3) ",
    requirement: "Write a program to check if number is a SPY number or not",
    tests: runTests.toString()
}


function runTests() {
    if (solve(123) === false) error("Test failed")
}
