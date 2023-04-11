import { shadowBox } from '../../utils/styles';
import ColorScheme from '../../utils/colors';

it('create shadowBox with default shadow color', () => {
  const style = shadowBox();
  expect(style).toStrictEqual({
    shadowColor: ColorScheme.get().shadowColor + '80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  });
});

it('create shadowBox with custom shadow color', () => {
  const style = shadowBox('#000000');
  expect(style).toStrictEqual({
    shadowColor: '#00000080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  });
});
