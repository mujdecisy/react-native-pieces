import React from 'react';
import { View } from 'react-native';

export interface TakozProps {
	size?: number | string
	width?: number | string
	height?: number | string
}

const DEF_SIZE = 20 as number|string;

const Takoz = (props: TakozProps) => {
	const width = props.width || props.size || DEF_SIZE;
	const height = props.height || props.size || DEF_SIZE;

	return (
		<View style={{width, height}} />
	);
};

export default Takoz;
