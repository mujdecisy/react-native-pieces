import { deepCopy } from "../../utils/funcs";

it('creates deepCopy of object', () =>{
    const value = {
        testKey: {
            innerTestKey: 'testValue'
        }
    };
    const copiedValue = deepCopy(value);
    value.testKey.innerTestKey = 'anotherTestValue'

    expect(copiedValue.testKey.innerTestKey).not.toBe('anotherTestValue');
});