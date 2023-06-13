import React, { useState } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import ColorScheme from '../../utils/colors';
import SizeScheme from '../../utils/sizes';

interface CheckBoxProps {
  items: {
    name: string;
    value: string;
  }[];
  handleChange?: (checkedItemValues: string[]) => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const [items, setItems] = useState(
    props.items.map((e) => ({ ...e, checked: false }))
  );

  return (
    <View>
      {items.map((e, i) => (
        <Pressable
          key={`checkboxitem_${i}`}
          style={styles.checkBoxRow}
          onPress={() => {
            const tempItems = [...items];
            // @ts-ignore
            tempItems[i].checked = !tempItems[i].checked;
            setItems(tempItems);

            if (props.handleChange) {
              props.handleChange(
                tempItems.filter((e1) => e1.checked).map((e1) => e1.value)
              );
            }
          }}
        >
          <View style={[styles.checkBox, e.checked && styles.checked]} />
          <Text style={styles.text}> {e.name} </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {},
  checkBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorScheme.get().secondary,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    marginEnd: 10,
    borderColor: ColorScheme.get().secondary,
    borderRadius: 5,
  },
  checked: {
    backgroundColor: ColorScheme.get().primary,
  },
  text: {
    fontSize: SizeScheme.get().font.e,
  },
});

export default CheckBox;
