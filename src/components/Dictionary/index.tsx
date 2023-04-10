import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import ColorScheme from '../../style/colors';
import { shadowBox } from '../../style/styles';
import SizeScheme from '../../style/sizes';
import Takoz from '../Takoz';

export interface DictionaryProps {
	data: {
		key: string
		value: string
	}[],
	style?: ViewStyle
}

const Dictionary = (props: DictionaryProps) => {
	return (
		<View style={styles.container}>
			{
				props.data.map((e, ix) => (
					<View key={`info-${ix}`}>
						<View style={styles.row}>
							<View style={styles.labelCont}><Text style={styles.labelText}>{e.key}</Text></View>
							<View style={styles.valueCont}><Text style={styles.valueText}>{e.value}</Text></View>
						</View>
						{
							ix < props.data.length - 1 && (<Takoz />)
						}
					</View>
				))
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
			backgroundColor: ColorScheme.hyalo(ColorScheme.get().secondary, 0.5),
			borderRadius: 20,
			paddingVertical: SizeScheme.get().gap.pad,
			paddingHorizontal: SizeScheme.get().gap.pad / 2,
			...shadowBox()
	},
	row: {
		display: 'flex',
		flexDirection: 'row'
	},
	labelCont: {
		flex: 2,
		paddingRight: SizeScheme.get().gap.pad / 2,
		borderBottomWidth: 0.1,
		borderBottomColor: ColorScheme.get().secondary
	},
	labelText: {
		fontWeight: 'bold',
		fontSize: SizeScheme.get().font.e,
		color: ColorScheme.get().textLight
	},
	valueCont: {
		flex: 3,
		paddingLeft: 10
	},
	valueText: {
		fontSize: SizeScheme.get().font.e,
		color: ColorScheme.get().textDark
	}
});
export default Dictionary;
