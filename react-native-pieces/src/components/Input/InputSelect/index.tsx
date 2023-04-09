import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable, TextStyle, ScrollView } from 'react-native';
import ColorScheme from '../../../style/colors';
import ButtonText from '../../ButtonText';
import Takoz from '../../Takoz';
import { InputTypes } from '../types';
import { shadowBox } from '../../../style/styles';
import SizeScheme from '../../../style/sizes';

export interface InputSelectProps {
	style: ViewStyle
	textStyle: TextStyle
	value: string[]
	placeholder: string
	handleModalOpen: () => void
	options: string[]
}

const InputSelect = (props: InputSelectProps) => {
	return (
		<Pressable
			style={props.style}
			onPress={props.handleModalOpen}
		>
			{
				(!props.value || props.value.length < 1) ?
					(<Text style={{ ...props.textStyle, color: ColorScheme.get().textLight }}>{props.placeholder}</Text>)
					: (
						<Text style={props.textStyle}>
							{
								props.value.map(e => (
									props.options[parseInt(e)]
								)).join(', ')
							}
						</Text>
					)
			}
		</Pressable>
	);
};

export default InputSelect;


export const InputSelectModalContent = (
	{ value, options, type, handleChange }
		: {
			value: string[], options: string[],
			type: InputTypes.SINGLE | InputTypes.MULTI,
			handleChange: (selecteds: string[]) => void
		}) => {

	const [selected, setSelected] = useState(value.map(e => parseInt(e)));

	const optionHandlers = {
		[InputTypes.SINGLE]: (ix: number) => {
			setSelected([ix]);
		},
		[InputTypes.MULTI]: (ix: number) => {
			const cache = [...selected];
			const ixof = cache.indexOf(ix);
			if (ixof === -1) {
				cache.push(ix);
			} else {
				cache.splice(ixof, 1);
			}
			setSelected(cache);
		}
	};

	return (
		<>
			<ScrollView>
				<View>
					{
						options.map((e, ix) => (
							<Pressable
								style={{
									...styles.option,
									...(selected.includes(ix) ? {
										backgroundColor: ColorScheme.get().primary,
										...shadowBox()
									} : {})
								}}
								key={`option-${ix}`}
								onPress={() => {
									optionHandlers[type](ix);
								}}>
								<Text style={{ fontSize: SizeScheme.get().font.c }}>{e}</Text>
							</Pressable>
						))
					}
				</View>
			</ScrollView>
			<Takoz />
			<View style={styles.buttonCnt}>
				<ButtonText
					style={{ maxWidth: '50%', marginLeft: 'auto' }}
					label='Clear'
					handleClick={() => {
						setSelected([]);
					}} />
				<Takoz />
				<ButtonText
					style={{ maxWidth: '50%' }}
					label='Save'
					handleClick={() => {
						handleChange(selected.map(e => e.toString()));
					}} />
			</View>
		</>
	);
}


const styles = StyleSheet.create({
	option: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 2,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	buttonCnt: {
		display: 'flex',
		flexDirection: 'row'
	}
});