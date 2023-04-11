import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import React from 'react';
import InputText from '../../../../components/Input/InputText';

it('renders correctly', () => {
  const func = jest.fn();

  const component = renderer.create(
    <InputText
      value={['test-value']}
      handleChange={func}
      style={{ width: 100 }}
      placeholder="test-placeholder"
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('throws error on empty value array', () => {
  const func = jest.fn();

  const renderFunc = () => {
    renderer.create(
      <InputText
        value={[]}
        handleChange={func}
        style={{ width: 100 }}
        placeholder="test-placeholder"
      />
    );
  };
  expect(renderFunc).toThrow(/Value array.*only one/);
});

it('handles text changes', () => {
  const func = jest.fn();

  const component = renderer.create(
    <InputText value={['']} handleChange={func} style={{}} placeholder="" />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  renderer.act(() => {
    tree.props.onChangeText('test');
  });

  expect(func).toHaveBeenCalledWith(['test']);
});
