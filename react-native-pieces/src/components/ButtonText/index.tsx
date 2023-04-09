import React from 'react';
import { Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import ColorScheme from '../../style/colors';
import SizeScheme from '../../style/sizes';
import { shadowBox } from '../../style/styles';

export interface ButtonTextProps {
	label: string
	handleClick: () => void
	style?: ViewStyle
}

const ButtonText = (props: ButtonTextProps) => {
	return (
		<Pressable style={{ ...styles.button, ...props.style }} onPress={props.handleClick}>
			<Text style={styles.label}>{props.label}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: ColorScheme.get().primary,
		borderRadius: 10,
		...shadowBox()
	},
	label: {
		color: ColorScheme.get().textDark,
		fontSize: SizeScheme.get().font.d,
		margin: 'auto',
		textAlignVertical: 'center',
		textAlign: 'center'
	}
});

export default ButtonText;
