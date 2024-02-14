
export const challenge = {
    id: 1,
    title: "Spy number",
    description: "A Number is called SPY number if the sum and Product of its Digits are equal",
    example: " For Ex: 123 is a SPY Number, (1+2+3) = (1*2*3) ",
    requirement: "Write a program to check if number is a SPY number or not",
    tests: runTests.toString()
}


function runTests() {
    if (solve(123) !== true) error("Test 1 failed");

    if (solve(124) !== false) error("Test 2 failed");

    if (solve(-132) !== true) error("Test 3 failed");

    if (solve(-124) !== false) error("Test 4 failed");

    if (solve(123456789) !== true) error("Test 5 failed");

    if (solve(123456788) !== false) error("Test 6 failed");

    if (solve(1) !== false) error("Test 7 failed");

    if (solve(0) !== true) error("Test 8 failed");

    if (solve(-12) !== true) error("Test 9 failed");

    if (solve(-13) !== false) error("Test 10 failed");
}
