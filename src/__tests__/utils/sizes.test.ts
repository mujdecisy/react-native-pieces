import SizeScheme from '../../utils/sizes';

it('creates singleton sizeScheme', () => {
  const defaultScheme = SizeScheme.get();
  expect(defaultScheme).toBeInstanceOf(Object);
});

describe('SizeScheme functionality', () => {
  beforeEach(() => {
    SizeScheme.setDefault();
  });

  it('updates sizeScheme', () => {
    const defaultScheme = SizeScheme.get();
    defaultScheme.gap.pad = 25;
    SizeScheme.set(defaultScheme);

    const updatedScheme = SizeScheme.get();
    expect(updatedScheme).toStrictEqual(defaultScheme);
  });

  it('updates sizeScheme with improper width data min > max', () => {
    const defaultScheme = SizeScheme.get();
    defaultScheme.screen.width.max = 200;
    defaultScheme.screen.width.min = 300;

    const func = () => {
      SizeScheme.set(defaultScheme);
    };

    expect(func).toThrowError(/Max.*greater.*min/);
  });

  it('updates sizeScheme with improper width data min < 0', () => {
    const defaultScheme = SizeScheme.get();
    defaultScheme.screen.width.min = -300;

    const func = () => {
      SizeScheme.set(defaultScheme);
    };

    expect(func).toThrowError(/Max.*greater.*min/);
  });

  it('updates sizeScheme with improper font data a < b', () => {
    const defaultScheme = SizeScheme.get();
    defaultScheme.font.a = 20;
    defaultScheme.font.b = 30;

    const func = () => {
      SizeScheme.set(defaultScheme);
    };

    expect(func).toThrowError(/Font size.*desc/);
  });

  it('updates sizeScheme with improper font data f < 1', () => {
    const defaultScheme = SizeScheme.get();
    defaultScheme.font.f = 0;

    const func = () => {
      SizeScheme.set(defaultScheme);
    };

    expect(func).toThrowError(/Font size.*desc/);
  });

  it('updates sizeScheme with improper pad data pad < 0', () => {
    const defaultScheme = SizeScheme.get();
    defaultScheme.gap.pad = -1;

    const func = () => {
      SizeScheme.set(defaultScheme);
    };

    expect(func).toThrowError(/Pad can not/);
  });
});
