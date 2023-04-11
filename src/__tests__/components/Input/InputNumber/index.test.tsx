import React from 'react';
import InputNumber from '../../../../components/Input/InputNumber';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { ValidStates } from '../../../../components/Input/types';


it('renders correctly', ()=>{
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{width: 100}}
            value={['']}
            placeholder={'test-placeholder'}/>
    );

    const tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
});

it('checks type when input a number', ()=>{
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{width: 100}}
            value={['']}
            placeholder={'test-placeholder'}/>
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
    
    renderer.act(()=>{
        tree.props.onChangeText('100');
    });
    expect(func).toHaveBeenCalledWith(['100'], ValidStates.VALID);
    // TODO find a way to check color by spying useRef hook
});


it('checks type when input a NaN', ()=>{
    const func = jest.fn();
    const component = renderer.create(
        <InputNumber
            handleChange={func}
            style={{width: 100}}
            value={['']}
            placeholder={'test-placeholder'}/>
    );
    let tree = component.toJSON() as ReactTestRendererJSON;
    expect(tree).toMatchSnapshot();
    
    renderer.act(()=>{
        tree.props.onChangeText('asd');
    });
    expect(func).toHaveBeenCalledWith(['asd'], ValidStates.INVALID);
    // TODO find a way to check color by spying useRef hook
});