import React from 'react';
import styled from 'styled-components';
import * as Formater from '../../../utilities/dateFormater.js';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
// Include the locale utils designed for moment
import MomentLocaleUtils from 'react-day-picker/moment';
// Make sure moment.js has the required locale data
import 'moment/locale/es';


export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const fromDateString = this.props.from ? this.props.from.split('-') : null;
    const toDateString = this.props.to ? this.props.to.split('-') : null;
    if (fromDateString[1] != 0){
      fromDateString[1] -= 1;
    }
    if (toDateString[1] != 0){
      toDateString[1] -= 1;
    }
    return {
      from: fromDateString ? new Date(fromDateString[0], fromDateString[1], fromDateString[2]) : null,
      to: toDateString ? new Date(toDateString[0], toDateString[1], toDateString[2]) : null,
    };
  }

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isBeforeLastDay = to && DateUtils.isDayBefore(day, to);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected || isBeforeLastDay;
  };

  handleDayClick = (day) => {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      console.log("lala")
      this.setState({
        from: day,
        to: null,
      });
      this.props.onStartDateSelection(Formater.triviaFormFormat(day));
    } else {
      this.setState({
        to: day,
      });
      this.props.onEndDateSelection(Formater.triviaFormFormat(day));
    }
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  render() {
    const { from, to } = this.state;
    console.log(this.props)
    console.log(new Date(2018, 11, 19))
    let disabledDays = { before: new Date()};
    if (this.props.currentType === 'startDate'){
      if (this.props.to) {disabledDays.after = this.props.to};
    } else {

    }
    console.log(disabledDays)
    const modifiers = { start: from, end: to };
    const selectedDays = [from, { from, to: to}];
    return (
      <React.Fragment>
        <DayPicker
          className = 'Range'
          numberOfMonths = {1}
          month = {from}
          selectedDays = {selectedDays}
          disabledDays = {disabledDays}
          modifiers = {modifiers}
          onDayClick = {this.handleDayClick}
          localeUtils = {MomentLocaleUtils}
          locale = 'es'
        />
      </React.Fragment>
    );
  }
}