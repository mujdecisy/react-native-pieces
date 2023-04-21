import { ValidStates, InputTypes } from '../../../components/Input/types';

it('matches ValidStates', () => {
  expect(ValidStates).toMatchInlineSnapshot(`
    Object {
      "0": "VALID",
      "1": "INVALID",
      "2": "UNDEFINED",
      "INVALID": 1,
      "UNDEFINED": 2,
      "VALID": 0,
    }
  `);
});

it('matches InputTypes', () => {
  expect(InputTypes).toMatchInlineSnapshot(`
    Object {
      "0": "TEXT",
      "1": "NUMBER",
      "2": "DATE",
      "3": "SINGLE",
      "4": "MULTI",
      "DATE": 2,
      "MULTI": 4,
      "NUMBER": 1,
      "SINGLE": 3,
      "TEXT": 0,
    }
  `);
});
