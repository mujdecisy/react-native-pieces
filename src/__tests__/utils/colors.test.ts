import ColorScheme from "../../utils/colors";

beforeEach(()=>{
    ColorScheme.setDefault();
});

it('creates singleton colorScheme', () => {
    const defaultScheme = ColorScheme.get();
    expect(defaultScheme).toBeInstanceOf(Object);
});

it('updates colorscheme', () => {
    const defaultScheme = { ...ColorScheme.get() };
    defaultScheme.backgroundDark = '#AAAAAA';
    ColorScheme.set(defaultScheme);

    const updatedScheme = ColorScheme.get();
    expect(defaultScheme).toStrictEqual(updatedScheme);
});

it('updates colorscheme with improper color', () => {
    const defaultScheme = { ...ColorScheme.get() };
    defaultScheme.backgroundDark = '#AAAAAAZZ';
    const func = () =>{
        ColorScheme.set(defaultScheme);
    }
    expect(func).toThrowError(/Color format/);
});

it('updates colorscheme.customColors with improper color', () => {
    const defaultScheme = { ...ColorScheme.get() };
    defaultScheme.customColors['ok'] = '#AAAAZZ';
    const func = () =>{
        ColorScheme.set(defaultScheme);
    }
    expect(func).toThrowError(/Color format/);
});

it('makes 6 digit color more transparent', () => {
    const transparentColor = ColorScheme.hyalo('#000000');
    expect(transparentColor).toBe('#000000CC');
});

it('makes 8 digit color more transparent', () => {
    const transparentColor = ColorScheme.hyalo('#000000CC');
    expect(transparentColor).toBe('#00000099');
});

it('makes 8 digit color not more than full trancparency', () => {
    const transparentColor = ColorScheme.hyalo('#00000010');
    expect(transparentColor).toBe('#00000000');
});

it('makes 6 digit color 50% transparent', () => {
    const transparency = 0.5;
    const transparentColor = ColorScheme.hyalo('#000000', transparency);
    expect(transparentColor).toBe('#00000080');
});

it('prevent 6 digit color not more than greater than 1', () => {
    const transparency = 1.7;
    const transparentColor = ColorScheme.hyalo('#000000CC', transparency);
    expect(transparentColor).toBe('#000000FF');
});

