import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import React from 'react';
import InputText from '../../../../components/Input/InputText';
import { Settings } from '../../../../components/Input/types';

it('renders correctly', () => {
  const func = jest.fn();

  const component = renderer.create(
    <InputText
      value={['test-value']}
      handleChange={func}
      style={{ width: 100 }}
      placeholder="test-placeholder"
      settings={[]}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('renders multiline correctly', () => {
  const func = jest.fn();

  const component = renderer.create(
    <InputText
      value={['test-value']}
      handleChange={func}
      style={{ width: 100 }}
      placeholder="test-placeholder"
      settings={[Settings.TEXT_MULTILINE]}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('throws error on empty value array', () => {
  let errString = '';
  jest.spyOn(console, 'error').mockImplementation(
    jest.fn((val) => {
      errString = val;
    })
  );
  const component = renderer.create(
    <InputText
      value={[]}
      handleChange={jest.fn()}
      style={{ width: 100 }}
      placeholder="test-placeholder"
      settings={[]}
    />
  );
  let tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
  expect(tree).toBe(null);
  expect(/Value array.*only one/.test(errString)).toBe(true);
});

it('handles text changes', () => {
  const func = jest.fn();

  const component = renderer.create(
    <InputText
      value={['']}
      handleChange={func}
      style={{}}
      placeholder=""
      settings={[]}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  renderer.act(() => {
    tree.props.onChangeText('test');
  });

  expect(func).toHaveBeenCalledWith(['test']);
});
