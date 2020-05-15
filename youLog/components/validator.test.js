const checkName = require('./checkName');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');

test('Validator test', () => {
    const password = "motdepasse_1234/%*"
    expect(password.length).toBeGreaterThan(6)
    expect(checkName(3456789)).toBe(false)
    expect(checkEmail("jean@phe.fr")).toBe(true)
    expect(checkPassword(password)).toBe(true)
})