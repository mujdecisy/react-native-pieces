export interface ISizeScheme {
	font: {
		a: number,
		b: number,
		c: number,
		d: number,
		e: number,
		f: number
	},
	gap : {
		pad: number
	}
	screen: {
		width: {
			max: number,
			min: number
		}
	}
}

const defaultScheme = {
	font: {
		a: 38,
		b: 30,
		c: 24,
		d: 20,
		e: 16,
		f: 14
	},
	gap: {
		pad: 20
	},
	screen: {
		width: {
			max: 500,
			min: 360
		}
	}
} as ISizeScheme;

export default class SizeScheme {
	private static scheme: ISizeScheme;

	public static set(schemeP: ISizeScheme) {
		SizeScheme.scheme = schemeP;
	}

	public static get() {
		if (!SizeScheme.scheme) {
			SizeScheme.set(defaultScheme);
		}
		return SizeScheme.scheme;
	}
}