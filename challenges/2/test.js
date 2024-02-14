
export const challenge = {
    id: 2,
    title: "This is another challenge",
    description: "Ignore that",
    example: "Some example",
    requirement: "Will be deleted soon",
    tests: runTests.toString()
}


function runTests() {
    if (solve(123) === false) error("Test failed")
}
