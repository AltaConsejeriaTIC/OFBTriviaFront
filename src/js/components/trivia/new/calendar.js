import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
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
    const start = this.props.from ? new Date(this.props.from) : null;
    const end = this.props.to ? new Date(this.props.to) : null;
    return {
      from: start,
      to: end,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  handleDayClick = (day) => {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
      this.props.onStartDateSelection(moment(day).format('YYYY-MM-DD'));
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
      this.props.onEndDateSelection(moment(day).format('YYYY-MM-DD'));
    }
  };

  handleDayMouseEnter = (day) => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: to };
    const disabledDays = { before: this.state.from ? this.state.from : new Date()};
    const selectedDays = [from, { from, to: to}];
    return (
      <DayPicker
        className="Range"
        numberOfMonths={1}
        fromMonth={from}
        month={from}
        selectedDays={selectedDays}
        disabledDays={disabledDays}
        modifiers={modifiers}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        localeUtils={MomentLocaleUtils}
        locale='es'
      />
    );
  }
}