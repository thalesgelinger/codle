
export const challenge = {
    id: 2,
    title: "Similar Characters",
    description: "Write a Program to find Similar Characters from two string and give count of then as output",
    example: '"Next", "Gen" -> 1, "hello", "hello" -> 4, "Round", "SoUnd" -> 3 ',
    requirement: "",
    tests: runTests.toString(),
    inputParams: ["string1", "string2"]
}


function runTests() {
    assert(solve("Next", "Gen") !== 1, "Test failed: Similar Characters count between 'Next' and 'Gen' should be 1.")
    assert(solve("Round", "SoUnd") !== 3, "Test failed: Similar Characters count between 'Round' and 'SoUnd' should be 3.")
    assert(solve("", "") !== 0, "Test failed: No similar characters found between empty strings.")
    assert(solve("AaBbCcDd", "AbbCccDdd") !== 6, "Test failed: Similar Characters count between 'AaBbCcDd' and 'AbbCccDdd' should be 11.")
    assert(solve("abCdeFGhi", "ABCDeFgHi") !== 4, "Test failed: Similar Characters count between 'abCdeFGhi' and 'ABCDeFgHi' should be 8.")
    assert(solve("1234567890", "0123456789") !== 10, "Test failed: Similar Characters count between '1234567890' and '0123456789' should be 9.")
    assert(solve("Python", "Java") !== 0, "Test failed: Similar Characters count between 'Python' and 'Java' should be 2.")
    assert(solve("hello", "world") !== 2, "Test failed: Similar Characters count between 'hello' and 'world' should be 1.")
}
