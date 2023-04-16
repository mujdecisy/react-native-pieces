import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ColorScheme from '../../utils/colors';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ButtonIcon from '../ButtonIcon';
import { shadowBox } from '../../utils/styles';

export interface CalendarProps {
  targetDate: Date;
  handleChange?: (date: Date) => void;
  renderCell?: (date: Date) => React.ReactNode;
}

const TP_RATIO = 0.3;
const COUNT_MAX_ROW = 6;
const HEIGHT_ROW = 40;

const COLOR_PRIMARY_LIGHT = ColorScheme.hyalo(ColorScheme.get().primary, 0.3);
const COLOR_SECONDARY_LIGHT = ColorScheme.hyalo(
  ColorScheme.get().secondary,
  TP_RATIO
);

const Calendar = (props: CalendarProps) => {
  const [dates, setDates] = useState(
    getCalendarDates(props.targetDate || new Date())
  );
  const [targetDate, setTargetDate] = useState(props.targetDate || new Date());

  useEffect(() => {
    if (targetDate instanceof Date) {
      setDates(getCalendarDates(targetDate));
      if (props.handleChange) {
        props.handleChange(targetDate);
      }
    }
  }, [props.targetDate, targetDate]);

  if (dates.length < 1) {
    return (<></>);
  }

  return (
    <View style={{ marginBottom: (COUNT_MAX_ROW - dates.length) * HEIGHT_ROW }}>
      {/** ------------------------------------------ MONTH CONTROL */}
      <View style={styles.monthControlCont}>
        <ButtonIcon
          faIcon={faAngleLeft}
          handleClick={() => {
            const tdate = new Date(targetDate);
            tdate.setMonth(tdate.getMonth() - 1);
            setTargetDate(tdate);
          }}
        />
        <Text style={{ fontWeight: 'bold' }}>{`${targetDate.toLocaleString(
          'en-us',
          { month: 'long' }
        )} ${targetDate.getFullYear()}`}</Text>
        <ButtonIcon
          faIcon={faAngleRight}
          handleClick={() => {
            const tdate = new Date(targetDate);
            tdate.setMonth(tdate.getMonth() + 1);
            setTargetDate(tdate);
          }}
        />
      </View>

      {/** ------------------------------------------ CALENDAR GRID */}
      <View style={styles.gridCont}>
        {/** -------------------------------- HEADER DAYS */}
        <View style={{ ...styles.gridRow, ...{ borderTopWidth: 0 } }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((e) => (
            <View
              style={{ ...styles.gridCell, ...styles.gridHeader }}
              key={`tag-${e}`}
            >
              <Text style={{ fontWeight: 'bold' }}>{e}</Text>
            </View>
          ))}
        </View>

        {/** -------------------------------- DATES */}
        {dates.map((e, ix) => (
          <View style={styles.gridRow} key={`week-${ix}`}>
            {e.map((e1, ix1) => (
              <Pressable
                style={styles.gridCell}
                key={`day-${ix}-${ix1}`}
                onPress={() => {
                  if (e1.getMonth() === targetDate.getMonth()) {
                    setTargetDate(e1);
                  }
                }}
              >
                <View
                  style={{
                    ...{
                      width: '100%',
                      height: '100%',
                      backgroundColor: COLOR_PRIMARY_LIGHT,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    ...(dateToString(e1) === dateToString(targetDate)
                      ? {
                        backgroundColor: ColorScheme.get().primary,
                        borderRadius: 5,
                        ...shadowBox(),
                      }
                      : {}),
                    ...(e1.getMonth() !== targetDate.getMonth()
                      ? {
                        backgroundColor: COLOR_SECONDARY_LIGHT,
                      }
                      : {}),
                  }}
                >
                  {props.renderCell
                    ? props.renderCell(e1)
                    : renderCellDefault(e1)}
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridCont: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    overflow: 'hidden',
    ...shadowBox(),
  },
  gridRow: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 0.1,
    borderTopColor: ColorScheme.get().textDark,
  },
  gridCell: {
    flex: 1,
    height: 40,
  },
  gridHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: ColorScheme.get().primary,
  },
  monthControlCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Calendar;

export const dateToString = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
const renderCellDefault = (date: Date) => <Text>{date.getDate()}</Text>;
const getCalendarDates = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const calendarDates = [] as Date[][];
  const currentDate = new Date(startDate);
  let week = [] as Date[];
  while (currentDate <= endDate) {
    week.push(new Date(currentDate));
    if (week.length === 7) {
      calendarDates.push(week);
      week = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendarDates;
};
