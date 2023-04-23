import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Input from '../../../components/Input';
import { InputTypes, ValidStates } from '../../../components/Input/types';

it('renders input type text correctly', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <Input label="" value={['']} type={InputTypes.TEXT} handleChange={fun} />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[0].children[1].children[0].props.onChangeText('A');
  });

  expect(fun).toHaveBeenLastCalledWith(['A'], ValidStates.UNDEFINED);
});

it('renders input type number correctly', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <Input label="" value={['']} type={InputTypes.NUMBER} handleChange={fun} />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[0].children[1].children[0].props.onChangeText('2');
  });

  expect(fun).toHaveBeenLastCalledWith(['2'], ValidStates.VALID);
});

it('renders input type date correctly', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <Input label="" value={['']} type={InputTypes.DATE} handleChange={fun} />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[0].children[1].children[0].props.onChangeText('20');
  });

  expect(fun).toHaveBeenLastCalledWith(['20'], ValidStates.INVALID);
});

it('open modal for input type date correctly', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <Input label="" value={['']} type={InputTypes.DATE} handleChange={fun} />
  );
  let tree = component.toJSON() as ReactTestRendererJSON;

  // OPEN MODAL
  expect(
    // @ts-ignore
    tree.children[1].props.visible
  ).toBe(false);
  renderer.act(() => {
    // @ts-ignore
    tree.children[0].children[1].children[1].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree.children[1].props.visible
  ).toBe(true);

  // CLOSE MODAL
  renderer.act(() => {
    // @ts-ignore
    tree.children[1].children[0].children[0].children[3].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree.children[1].props.visible
  ).toBe(false);
});

it('renders input type select single correctly', () => {
  const component = renderer.create(
    <Input
      label=""
      value={['']}
      type={InputTypes.SINGLE}
      options={['A', 'B', 'C']}
      handleChange={jest.fn()}
    />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('renders input type select multi correctly', () => {
  const component = renderer.create(
    <Input
      label=""
      value={['']}
      type={InputTypes.MULTI}
      options={['A', 'B', 'C']}
      handleChange={jest.fn()}
    />
  );
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});
