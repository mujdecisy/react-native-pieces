import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Calendar from '../../../components/Calendar';
import ColorScheme from '../../../utils/colors';

it('renders correctly', () => {
  const component = renderer.create(
    <Calendar targetDate={new Date('2023-01-01')} />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});

it('moves to prev month', () => {
  const component = renderer.create(
    <Calendar targetDate={new Date('2023-01-01')} />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[0].children[0].props.onClick();
  });

  tree = component.toJSON() as ReactTestRendererJSON;
  // @ts-ignore
  expect(tree.children[0].children[1].children[0]).toBe('December 2022');
});

it('moves to next month', () => {
  const component = renderer.create(
    <Calendar targetDate={new Date('2023-01-01')} />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[0].children[2].props.onClick();
  });

  tree = component.toJSON() as ReactTestRendererJSON;
  // @ts-ignore
  expect(tree.children[0].children[1].children[0]).toBe('February 2023');
});

it('clicks a propriate day', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <Calendar targetDate={new Date('2023-01-01')} handleChange={fun} />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[1].children[3].children[3].props.onClick();
  });

  tree = component.toJSON() as ReactTestRendererJSON;

  expect(fun).toHaveBeenCalled();
  // @ts-ignore
  expect(
    tree.children[1].children[3].children[3].children[0].props.style
      .backgroundColor
  ).toBe(ColorScheme.get().primary);
});

it('clicks an inapropriate day', () => {
  const fun = jest.fn();
  const component = renderer.create(
    <Calendar targetDate={new Date('2023-01-01')} handleChange={fun} />
  );

  let tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    // @ts-ignore
    tree.children[1].children[5].children[6].props.onClick();
  });

  tree = component.toJSON() as ReactTestRendererJSON;

  expect(fun).not.toHaveBeenCalled();
});

it('renders with a different cell renderer', () => {
  const component = renderer.create(
    <Calendar
      targetDate={new Date('2023-01-01')}
      renderCell={(_: Date) => <>HELLO</>}
    />
  );

  const tree = component.toJSON() as ReactTestRendererJSON;
  // @ts-ignore
  expect(tree.children[1].children[3].children[3].children[0].children[0]).toBe(
    'HELLO'
  );
});
