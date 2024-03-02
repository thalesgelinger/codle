
export const challenge = {
    id: 1,
    title: "Spy number",
    description: "A Number is called SPY number if the sum and Product of its Digits are equal",
    example: " For Ex: 123 is a SPY Number, (1+2+3) = (1*2*3) ",
    requirement: "Write a program to check if number is a SPY number or not",
    tests: runTests.toString(),
    inputParams: ["value"]
}


function runTests() {
    assert(solve(123) !== true, "Test 1 failed");

    assert(solve(124) !== false, "Test 2 failed");

    assert(solve(-132) !== false, "Test 3 failed");

    assert(solve(-124) !== false, "Test 4 failed");

    assert(solve(-12) !== false, "Test 8 failed");
}
