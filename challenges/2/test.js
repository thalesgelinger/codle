
export const challenge = {
    title: "This is another challenge",
    description: "Ignore that",
    example: "Some example",
    requirement: "Will be deleted soon",
    tests: runTests.toString()
}


function runTests() {
    if (solve(123) === false) error("Test failed")
}
