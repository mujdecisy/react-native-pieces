export interface IColorScheme {
	primary: string,
	secondary: string,
	tertiary: string,

	textLight: string,
	textDark: string,
	backgroundLight: string,
	backgroundDark: string,
	
	positive: string,
	negative: string,

	customColors: Record<string, string>
}

const defaultScheme = {
	primary: '#FFE66D',
	secondary: '#C4C4C4',
	textLight: '#555555',
	textDark: '#000000',
	backgroundLight: '#FBFBFB',
	backgroundDark: '#F5F5F5',
	positive: '#DEEDDE',
	negative: '#FFE2E4',
	customColors: {
		ok: '#DEEDDE',
		error: '#FFE2E4',
		red: '#FFB6B9',
		blue: '#89BCCE',
		green: '#C8E6C9',
		yellow: '#FFE0B2',
		pink: '#FFB6ED'
	} as Record<string, string>
} as IColorScheme

export default class ColorScheme {
	private static scheme: IColorScheme;

	public static set(schemeP: IColorScheme) {
		ColorScheme.scheme = schemeP;
	}

	public static get() {
		if (!ColorScheme.scheme) {
			ColorScheme.set(defaultScheme);
		}
		return ColorScheme.scheme;
	}

	public static hyalo(color: string, transparency?: number) {
		let a = 1;
		if (transparency) {
			a = Math.max(0, Math.min(transparency, 1));
		} else {
			const aStr = color.slice(7, 9);
			a = parseInt(aStr ? aStr : 'FF', 16) / 16;
			a = Math.max(0, Math.min(a, 1));
			a -= 0.2;
		}
		const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
		return color.slice(0, 7) + alpha;
	}
}