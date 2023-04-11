import React, { useState as useStateMock } from 'react'
import InputNumber from '../../../../components/Input/InputNumber';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { ValidStates } from '../../../../components/Input/types';
import ColorScheme from '../../../../utils/colors';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));
const setBgColor = jest.fn();
beforeEach(() => {
    ; (useStateMock as jest.Mock).mockImplementation(init => [init, setBgColor])
})


it('renders correctly', () => {
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{ width: 100 }}
            value={['']}
            placeholder={'test-placeholder'} />
    );

    const tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
});

it('throws error when sending empty array as value', () => {
    const func = jest.fn();
    const renderFunc = () => {
        renderer.create(
            <InputNumber
                handleChange={func}
                style={{ width: 100 }}
                value={[]}
                placeholder={'test-placeholder'} />
        );
    }
    expect(renderFunc).toThrow(/Value array.*only one/);
});

it('checks type when input a number', () => {
    const posBgColor = ColorScheme.hyalo(ColorScheme.get().positive);
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{ width: 100 }}
            value={['']}
            placeholder={'test-placeholder'} />
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();

    // INTEGER
    renderer.act(() => {
        tree.props.onChangeText('100');
    });
    expect(func).toHaveBeenCalledWith(['100'], ValidStates.VALID);
    expect(setBgColor).toHaveBeenLastCalledWith(posBgColor);

    // FLOAT
    renderer.act(() => {
        tree.props.onChangeText('100.123');
    });
    expect(func).toHaveBeenCalledWith(['100.123'], ValidStates.VALID);
    expect(setBgColor).toHaveBeenLastCalledWith(posBgColor);

    // NEGATIVE
    renderer.act(() => {
        tree.props.onChangeText('-100.123');
    });
    expect(func).toHaveBeenCalledWith(['-100.123'], ValidStates.VALID);
    expect(setBgColor).toHaveBeenLastCalledWith(posBgColor);
});


it('checks type when input a NaN', () => {
    const negBgColor = ColorScheme.hyalo(ColorScheme.get().negative);
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{ width: 100 }}
            value={['']}
            placeholder={'test-placeholder'} />
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();

    // NOT NUMERIC
    renderer.act(() => {
        tree.props.onChangeText('asd');
    });
    expect(func).toHaveBeenCalledWith(['asd'], ValidStates.INVALID);
    expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

    // MULTI FLOAT
    renderer.act(() => {
        tree.props.onChangeText('123.123.123');
    });
    expect(func).toHaveBeenCalledWith(['123.123.123'], ValidStates.INVALID);
    expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);

    // COMMA AS DELIMITER
    renderer.act(() => {
        tree.props.onChangeText('123,123');
    });
    expect(func).toHaveBeenCalledWith(['123,123'], ValidStates.INVALID);
    expect(setBgColor).toHaveBeenLastCalledWith(negBgColor);
});


it('resets color when deleting input', () => {
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{ width: 100 }}
            value={['']}
            placeholder={'test-placeholder'} />
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
        tree.props.onChangeText('');
    });
    expect(func).toHaveBeenCalledWith([''], ValidStates.UNDEFINED);
    expect(setBgColor).toHaveBeenLastCalledWith(undefined);
});