import React, { useState as useStateMock } from 'react';
import InputDate, {
  InputDateModalContent,
  InputDateRightButton,
} from '../../../../components/Input/InputDate';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { ValidStates } from '../../../../components/Input/types';
import ColorScheme from '../../../../utils/colors';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
const setBgColor = jest.fn();
beforeEach(() => {
  (useStateMock as jest.Mock).mockImplementation((init) => [init, setBgColor]);
});

it('renders correctly', () => {
  const func = jest.fn();
  const component = renderer.create(
    <InputDate
      handleChange={func}
      style={{ width: 100 }}
      value={['']}
      placeholder={'test-placeholder'}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('shows empty when sending empty array as value', () => {
  let errString = '';
  jest.spyOn(console, 'error').mockImplementation(
    jest.fn((val) => {
      errString = val;
    })
  );

  const component = renderer.create(
    <InputDate
      handleChange={jest.fn()}
      style={{ width: 100 }}
      value={[]}
      placeholder={'test-placeholder'}
    />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
  expect(tree).toBe(null);
  expect(/Value array.*only one/.test(errString)).toBe(true);
});

it('checks type when input a date', () => {
  const posBgColor = ColorScheme.hyalo(ColorScheme.get().positive);
  const func = jest.fn();
  const component = renderer.create(
    <InputDate
      handleChange={func}
      style={{ width: 100 }}
      value={['']}
      placeholder={'test-placeholder'}
    />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  // DATE
  renderer.act(() => {
    tree.props.onChangeText('2023-01-01');
  });
  expect(func).toHaveBeenCalledWith(['2023-01-01'], ValidStates.VALID);
  expect(setBgColor).toHaveBeenLastCalledWith(posBgColor);
});

it('checks type when input not a date', () => {
  const negBgColor = ColorScheme.hyalo(ColorScheme.get().negative);
  const func = jest.fn();
  const component = renderer.create(
    <InputDate
      handleChange={func}
      style={{ width: 100 }}
      value={['']}
      placeholder={'test-placeholder'}
    />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  // NOT IN DATE FORMAT
  renderer.act(() => {
    tree.props.onChangeText('asd');
  });
  expect(func).toHaveBeenCalledWith(['asd'], ValidStates.INVALID);
  expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

  // NOT IN DATE FORMAT 2
  renderer.act(() => {
    tree.props.onChangeText('2023-01-01-01');
  });
  expect(func).toHaveBeenCalledWith(['2023-01-01-01'], ValidStates.INVALID);
  expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

  // NOT A VALID DATE
  renderer.act(() => {
    tree.props.onChangeText('2023-12-00');
  });
  expect(func).toHaveBeenCalledWith(['2023-12-00'], ValidStates.INVALID);
  expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

  // NOT A VALID DATE 2
  renderer.act(() => {
    tree.props.onChangeText('2023-02-30');
  });
  expect(func).toHaveBeenLastCalledWith(['2023-02-30'], ValidStates.INVALID);
  expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

  // NOT A VALID DATE 3
  renderer.act(() => {
    tree.props.onChangeText('2023-13-01');
  });
  expect(func).toHaveBeenLastCalledWith(['2023-13-01'], ValidStates.INVALID);
  expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

  // NOT A VALID DATE 4
  renderer.act(() => {
    tree.props.onChangeText('2023-04-31');
  });
  expect(func).toHaveBeenLastCalledWith(['2023-04-31'], ValidStates.INVALID);
  expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);
});

it('resets color when deleting input', () => {
  const func = jest.fn();
  const component = renderer.create(
    <InputDate
      handleChange={func}
      style={{ width: 100 }}
      value={['']}
      placeholder={'test-placeholder'}
    />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    tree.props.onChangeText('');
  });
  expect(func).toHaveBeenCalledWith([''], ValidStates.UNDEFINED);
  expect(setBgColor).toHaveBeenLastCalledWith(undefined);
});

it('renders correctly date button', () => {
  const func = jest.fn();
  const component = renderer.create(
    <InputDateRightButton
      handleClick={func}
      style={{ width: 100 }}
      buttonSize={20}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('renders correctly date modal content', () => {
  const func = jest.fn();
  const component = renderer.create(
    <InputDateModalContent handleChange={func} targetDate={['2023-01-01']} />
  );

  const tree = component.toJSON() as ReactTestRendererJSON[];
  expect(tree).toMatchSnapshot();
});

it('handles click on save new date', () => {
  const func = jest.fn();
  const component = renderer.create(
    <InputDateModalContent handleChange={func} targetDate={['2023-01-01']} />
  );

  let tree = component.toJSON() as ReactTestRendererJSON[];
  expect(tree).toMatchSnapshot();

  // TODO can not change date by clicking. find a way
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[1].children[3].children[3].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON[];

  renderer.act(() => {
    // @ts-ignore
    tree[2].props.onClick();
  });

  expect(func).toHaveBeenLastCalledWith(['2023-01-01']);
});
