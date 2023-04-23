import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import InputSelect, {
  InputSelectModalContent,
} from '../../../../components/Input/InputSelect';
import { InputTypes } from '../../../../components/Input/types';
import ColorScheme from '../../../../utils/colors';

const OPTIONS = ['A', 'B', 'C', 'D'];

it('renders correctly', () => {
  const component = renderer.create(
    <InputSelect
      value={[]}
      options={OPTIONS}
      textStyle={{}}
      placeholder={''}
      style={{}}
      handleModalOpen={() => {}}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('renders correctly when there is one value', () => {
  const component = renderer.create(
    <InputSelect
      value={['1']}
      options={OPTIONS}
      textStyle={{}}
      placeholder={''}
      style={{}}
      handleModalOpen={() => {}}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  // @ts-ignore
  expect(tree.children[0].children[0]).toBe('B');
});

it('renders correctly when there are values', () => {
  const component = renderer.create(
    <InputSelect
      value={['0', '3']}
      options={OPTIONS}
      textStyle={{}}
      placeholder={''}
      style={{}}
      handleModalOpen={() => {}}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  // @ts-ignore
  expect(tree.children[0].children[0]).toBe('A, D');
});

it('renders modal content correctly for single input type', () => {
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={() => {}}
      options={OPTIONS}
      type={InputTypes.SINGLE}
      value={[]}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('renders modal content correctly for multi input type', () => {
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={() => {}}
      options={OPTIONS}
      type={InputTypes.MULTI}
      value={[]}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('renders modal content correctly for multi input type with selected', () => {
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={() => {}}
      options={OPTIONS}
      type={InputTypes.MULTI}
      value={['0', '1']}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('handles clicks correctly for single input type', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={fun}
      options={OPTIONS}
      type={InputTypes.SINGLE}
      value={[]}
    />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;

  // clicking option B
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.style.backgroundColor
  ).toBe(ColorScheme.get().primary);
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[0].props.style.backgroundColor
  ).toBe(undefined);

  // clicking option A
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[0].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[0].props.style.backgroundColor
  ).toBe(ColorScheme.get().primary);
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.style.backgroundColor
  ).toBe(undefined);

  // clicking save button
  renderer.act(() => {
    // @ts-ignore
    tree[2].children[2].props.onClick();
  });
  expect(fun).toHaveBeenCalledWith(['0']);
});

it('handles clicks correctly for multi input type', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={fun}
      options={OPTIONS}
      type={InputTypes.MULTI}
      value={[]}
    />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;

  // clicking option B
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.style.backgroundColor
  ).toBe(ColorScheme.get().primary);
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[0].props.style.backgroundColor
  ).toBe(undefined);

  // clicking option A
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[0].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[0].props.style.backgroundColor
  ).toBe(ColorScheme.get().primary);
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.style.backgroundColor
  ).toBe(ColorScheme.get().primary);

  // clicking save button
  renderer.act(() => {
    // @ts-ignore
    tree[2].children[2].props.onClick();
  });
  expect(fun).toHaveBeenCalledWith(['1', '0']);
});

it('clears selected option for single input type', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={fun}
      options={OPTIONS}
      type={InputTypes.SINGLE}
      value={[]}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;

  // clicking option B
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.onClick();
  });
  // clicking save button
  renderer.act(() => {
    // @ts-ignore
    tree[2].children[2].props.onClick();
  });
  expect(fun).toHaveBeenLastCalledWith(['1']);

  // clicking clear button
  renderer.act(() => {
    // @ts-ignore
    tree[2].children[0].props.onClick();
  });
  // clicking save button
  renderer.act(() => {
    // @ts-ignore
    tree[2].children[2].props.onClick();
  });
  expect(fun).toHaveBeenLastCalledWith([]);
});

it('removes selection by clicking for multi input type', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <InputSelectModalContent
      handleChange={fun}
      options={OPTIONS}
      type={InputTypes.MULTI}
      value={[]}
    />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;

  // clicking option B
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.style.backgroundColor
  ).toBe(ColorScheme.get().primary);

  // clicking option B again
  renderer.act(() => {
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.onClick();
  });
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(
    // @ts-ignore
    tree[0].children[0].children[0].children[1].props.style.backgroundColor
  ).toBe(undefined);

  // clicking save button
  renderer.act(() => {
    // @ts-ignore
    tree[2].children[2].props.onClick();
  });
  expect(fun).toHaveBeenCalledWith([]);
});
