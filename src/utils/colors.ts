import { deepCopy } from './funcs';

const COLOR_REGEX = /^#([\dABCDEF]{8}|[\dABCDEF]{6})$/;

export interface IColorScheme {
  primary: string;
  secondary: string;
  tertiary: string;

  textLight: string;
  textDark: string;
  backgroundLight: string;
  backgroundDark: string;
  shadowColor: string;

  positive: string;
  negative: string;

  customColors: Record<string, string>;
}

const DEFAULT_SCHEME = {
  primary: '#FFE66D',
  secondary: '#C4C4C4',
  textLight: '#555555',
  textDark: '#000000',
  backgroundLight: '#FBFBFB',
  backgroundDark: '#F5F5F5',
  shadowColor: '#555555',
  positive: '#DEEDDE',
  negative: '#FFE2E4',
  customColors: {
    red: '#FFB6B9',
    blue: '#89BCCE',
    green: '#C8E6C9',
    yellow: '#FFE0B2',
    pink: '#FFB6ED',
  } as Record<string, string>,
} as IColorScheme;

const LOCAL_CONST = {
  alphaStart: 7,
  alphaEnd: 9,
  hexBase: 16,
  incRatio: 0.2,
  maxAlpha: 255,
  pad: 2,
};

export default class ColorScheme {
  private static scheme: IColorScheme;

  public static set(schemeP: IColorScheme) {
    ColorScheme.controlScheme(schemeP);
    ColorScheme.scheme = deepCopy(schemeP);
  }

  public static setDefault() {
    ColorScheme.scheme = deepCopy(DEFAULT_SCHEME);
  }

  public static get(): IColorScheme {
    if (!ColorScheme.scheme) {
      ColorScheme.set(deepCopy(DEFAULT_SCHEME));
    }
    return deepCopy(ColorScheme.scheme);
  }

  public static hyalo(color: string, transparency?: number): string {
    let a = 1;
    if (transparency) {
      a = transparency;
    } else {
      const aStr = color.slice(LOCAL_CONST.alphaStart, LOCAL_CONST.alphaEnd);
      a =
        parseInt(aStr ? aStr : 'FF', LOCAL_CONST.hexBase) /
        LOCAL_CONST.maxAlpha;
      a = Math.max(0, Math.min(a, 1));
      a -= LOCAL_CONST.incRatio;
    }
    a = Math.max(0, Math.min(a, 1));
    const alpha = Math.round(a * LOCAL_CONST.maxAlpha)
      .toString(LOCAL_CONST.hexBase)
      .padStart(LOCAL_CONST.pad, '0');
    return color.slice(0, LOCAL_CONST.alphaStart) + alpha.toUpperCase();
  }

  private static controlScheme(scheme: IColorScheme) {
    Object.entries(scheme)
      .filter((e) => e[0] !== 'customColors')
      .forEach((e) => {
        if (!COLOR_REGEX.test(e[1])) {
          throw new Error(`Color format not matched : ${e[1]}`);
        }
      });

    Object.entries(scheme.customColors).forEach((e) => {
      if (!COLOR_REGEX.test(e[1])) {
        throw new Error(`Color format not matched : ${e[1]}`);
      }
    });
  }
}
