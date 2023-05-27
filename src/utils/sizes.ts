import { Dimensions } from 'react-native';
import { deepCopy } from './funcs';

export interface ISizeScheme {
  font: {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
  };
  gap: {
    pad: number;
    layoutTop: number;
  };
  screen: {
    width: {
      max: number;
      min: number;
    };
    height: {
      min: number;
      window: number;
      screen: number;
    };
  };
}

const DEFAULT_SCHEME = {
  font: {
    a: 38,
    b: 30,
    c: 24,
    d: 20,
    e: 16,
    f: 14,
  },
  gap: {
    pad: 20,
    layoutTop: 40,
  },
  screen: {
    width: {
      max: 500,
      min: 360,
    },
    height: {
      min: 500,
      window: 0,
      screen: 0,
    },
  },
} as ISizeScheme;

export default class SizeScheme {
  private static scheme: ISizeScheme;

  public static set(schemeP: ISizeScheme) {
    SizeScheme.controlScheme(schemeP);
    schemeP.screen.height.window = Dimensions.get('window').height;
    schemeP.screen.height.screen = Dimensions.get('screen').height;
    schemeP.screen.height.min = Dimensions.get('window').height;
    SizeScheme.scheme = deepCopy(schemeP);
  }

  public static setDefault() {
    SizeScheme.set(DEFAULT_SCHEME);
  }

  public static get(): ISizeScheme {
    if (!SizeScheme.scheme) {
      SizeScheme.setDefault();
    }
    return deepCopy(SizeScheme.scheme);
  }

  private static controlScheme(scheme: ISizeScheme) {
    const { a, b, c, d, e, f } = scheme.font;
    const expectedOrder = [f, e, d, c, b, a];
    const sortedOrder = [...expectedOrder];
    sortedOrder.sort((x, y) => x - y);

    if (
      JSON.stringify(sortedOrder) !== JSON.stringify(expectedOrder) ||
      f < 1
    ) {
      throw new Error('Font size must be desc order and must be at least 1.');
    }

    if (
      scheme.screen.width.max < scheme.screen.width.min ||
      scheme.screen.width.min < 1
    ) {
      throw new Error(
        'Max width must be greater or equals to min and all must be at least 1'
      );
    }

    if (scheme.gap.pad < 0 || scheme.gap.pad > scheme.screen.width.min * 0.4) {
      throw new Error(
        'Pad can not be negative or can not be greater than 40% of min width.'
      );
    }
  }
}
