/* jshint esversion: 6 */
  angular
    .module('ngDaterangePicker', [])
    .factory('moment', ($window) => {
      return $window.moment;
    })
    .component('daterangePicker', {
      bindings: {
        inputId: '<',
        options: '<'
      },
      templateUrl: "./angular-daterangepicker.html",
      controller: ['$scope', '$document', 'moment', function($scope, $document, moment) {
        let self = this;
        self.init = () => {
            self.left = {};
            self.right = {};
            self.hourLeftValue=12;
            self.minuteLeftValue=0;
            self.secondLeftValue=0;
            self.hourRightValue=12;
            self.minuteRightValue=0;
            self.secondRightValue=0;

            // TODO:
            // This does not seem like the Angular way to figure out
            // if the click was on the daterange picker, but I couldn't
            // figure out a way to have the daterange picker listen for
            // all clicks in the window to determine if it was clicked on.
            $document.on('click', (e) => {          
              let clickedOnDaterangePicker = false;
              for(let i in e.path) {
                if (e.path[i].tagName == "DATERANGE-PICKER") {
                  clickedOnDaterangePicker = true;
                }
              }
              $scope.$apply(() => {
                if(clickedOnDaterangePicker) {
                  self.isShowing = true;
                } else {
                  self.isShowing = false;
                }
              });
            });

            //default settings for options
            self.startDate = (self.options.startDate !== undefined) ? self.options.startDate : moment().startOf('day');
            self.endDate = (self.options.endDate !== undefined) ? self.options.endDate : moment().endOf('day');
            self.minDate = (self.options.minDate !== undefined) ? self.options.minDate : false;
            self.maxDate = (self.options.maxDate !== undefined) ? self.options.maxDate : false;
            self.dateLimit = (self.options.dateLimit !== undefined) ? self.options.dateLimit : false;
            self.singleDatePicker = (self.options.singleDatePicker !== undefined) ? self.options.singleDatePicker : false;
            self.showDropdowns = (self.options.showDropdowns !== undefined) ? self.options.showDropdowns : false;
            self.showWeekNumbers = (self.options.showWeekNumbers !== undefined) ? self.options.showWeekNumbers : false;
            self.showISOWeekNumbers = (self.options.showISOWeekNumbers !== undefined) ? self.options.showISOWeekNumbers : false;
            self.showCustomRangeLabel = (self.options.customRangeLabel !== undefined) ? self.options.customRangeLabel : true;
            self.timePicker = (self.options.timePicker !== undefined) ? self.options.timePicker : false;
            self.timePicker24Hour = (self.options.timePicker24Hour !== undefined) ? self.options.timePicker24Hour : false;
            self.timePickerIncrement = (self.options.timePickerIncrement !== undefined) ? self.options.timePickerIncrement : 1;
            self.timePickerSeconds = (self.options.timePickerSeconds !== undefined) ? self.options.timePickerSeconds : false;
            self.linkedCalendars = (self.options.linkedCalendars !== undefined) ? self.options.linkedCalendars : true;
            self.alwaysShowCalendars = (self.options.alwaysShowCalendars !== undefined) ? self.options.alwaysShowCalendars : false;

            self.locale = {
                direction: 'ltr',
                separator: ' - ',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(),
                monthNames: moment.monthsShort(),
                firstDay: moment.localeData().firstDayOfWeek()
            };
            if (self.timePicker) {
                if (self.timePickerSeconds) {
                    self.locale.format = 'MM/DD/YYYY HH:mm:ss';
                } else {
                    self.locale.format = 'MM/DD/YYYY HH:mm';
                }
            } else {
                self.locale.format = moment.localeData().longDateFormat('L');
            }

            //some state information
            self.isShowing = false;
            self.left.calendar = {};
            self.right.calendar = {};

            let options = self.options !== undefined ? angular.copy(self.options) : {};

            //
            // handle all the possible options overriding defaults
            //

            if (typeof options.locale === 'object') {

                if (typeof options.locale.direction === 'string')
                    self.locale.direction = options.locale.direction;

                if (typeof options.locale.format === 'string')
                    self.locale.format = options.locale.format;

                if (typeof options.locale.separator === 'string')
                    self.locale.separator = options.locale.separator;

                if (typeof options.locale.daysOfWeek === 'object')
                    self.locale.daysOfWeek = options.locale.daysOfWeek.slice();

                if (typeof options.locale.monthNames === 'object')
                  self.locale.monthNames = options.locale.monthNames.slice();

                if (typeof options.locale.firstDay === 'number')
                  self.locale.firstDay = options.locale.firstDay;

                if (typeof options.locale.applyLabel === 'string')
                  self.locale.applyLabel = options.locale.applyLabel;

                if (typeof options.locale.cancelLabel === 'string')
                  self.locale.cancelLabel = options.locale.cancelLabel;

                if (typeof options.locale.weekLabel === 'string')
                  self.locale.weekLabel = options.locale.weekLabel;

                if (typeof options.locale.fromLabel === 'string')
                  self.locale.fromLabel = options.locale.fromLabel;

                if (typeof options.locale.toLabel === 'string')
                  self.locale.toLabel = options.locale.toLabel;

                if (typeof options.locale.customRangeLabel === 'string')
                  self.locale.customRangeLabel = options.locale.customRangeLabel;

            }

            if (typeof options.startDate === 'string')
                self.startDate = moment(options.startDate, self.locale.format);

            if (typeof options.endDate === 'string')
                self.endDate = moment(options.endDate, self.locale.format);

            if (typeof options.minDate === 'string')
                self.minDate = moment(options.minDate, self.locale.format);

            if (typeof options.maxDate === 'string')
                self.maxDate = moment(options.maxDate, self.locale.format);

            if (typeof options.startDate === 'object')
                self.startDate = moment(options.startDate);

            if (typeof options.endDate === 'object')
                self.endDate = moment(options.endDate);

            if (typeof options.minDate === 'object')
                self.minDate = moment(options.minDate);

            if (typeof options.maxDate === 'object')
                self.maxDate = moment(options.maxDate);

            // sanity check for bad options
            if (self.minDate && self.startDate.isBefore(self.minDate))
                self.startDate = self.minDate.clone();

            // sanity check for bad options
            if (self.maxDate && self.endDate.isAfter(self.maxDate))
                self.endDate = self.maxDate.clone();

            if (typeof options.applyClass === 'string')
                self.applyClass = options.applyClass;

            if (typeof options.cancelClass === 'string')
                self.cancelClass = options.cancelClass;

            if (typeof options.dateLimit === 'object')
                self.dateLimit = options.dateLimit;

            if (typeof options.showWeekNumbers === 'boolean')
                self.showWeekNumbers = options.showWeekNumbers;

            if (typeof options.showISOWeekNumbers === 'boolean')
                self.showISOWeekNumbers = options.showISOWeekNumbers;

            if (typeof options.buttonClasses === 'string')
                self.buttonClasses = options.buttonClasses;

            if (typeof options.buttonClasses === 'object')
                self.buttonClasses = options.buttonClasses.join(' ');

            if (typeof options.showDropdowns === 'boolean')
                self.showDropdowns = options.showDropdowns;

            if (typeof options.showCustomRangeLabel === 'boolean')
                self.showCustomRangeLabel = options.showCustomRangeLabel;

            if (typeof options.singleDatePicker === 'boolean') {
                self.singleDatePicker = options.singleDatePicker;
                if (self.singleDatePicker)
                    self.endDate = self.startDate.clone();
            }

            if (typeof options.timePicker === 'boolean')
                self.timePicker = options.timePicker;

            if (typeof options.timePickerSeconds === 'boolean')
                self.timePickerSeconds = options.timePickerSeconds;

            if (typeof options.timePickerIncrement === 'number')
                self.timePickerIncrement = options.timePickerIncrement;

            if (typeof options.timePicker24Hour === 'boolean')
                self.timePicker24Hour = options.timePicker24Hour;

            if (typeof options.linkedCalendars === 'boolean')
                self.linkedCalendars = options.linkedCalendars;

            if (typeof options.isInvalidDate === 'function') {
                self.isInvalidDate = options.isInvalidDate;
            } else {            
                self.isInvalidDate = () => {
                    return false;
                };
            }

            if (typeof options.isCustomDate === 'function') {
                self.isCustomDate = options.isCustomDate;
            } else {
                self.isCustomDate = () => {
                    return false;
                };
            }

            if (typeof options.alwaysShowCalendars === 'boolean')
                self.alwaysShowCalendars = options.alwaysShowCalendars;

            // update day names order to firstDay
            if (self.locale.firstDay != 0) {
                let iterator = self.locale.firstDay;
                while (iterator > 0) {
                    self.locale.daysOfWeek.push(self.locale.daysOfWeek.shift());
                    iterator--;
                }
            }

            if (typeof options.ranges === 'object') {
                self.ranges = {};
                for (range in options.ranges) {

                    if (typeof options.ranges[range][0] === 'string')
                        start = moment(options.ranges[range][0], self.locale.format);
                    else
                        start = moment(options.ranges[range][0]);

                    if (typeof options.ranges[range][1] === 'string')
                        end = moment(options.ranges[range][1], self.locale.format);
                    else
                        end = moment(options.ranges[range][1]);

                    // If the start or end date exceed those allowed by the minDate or dateLimit
                    // options, shorten the range to the allowable period.
                    if (self.minDate && start.isBefore(self.minDate))
                        start = self.minDate.clone();

                    let maxDate = self.maxDate;
                    if (self.dateLimit && maxDate && start.clone().add(self.dateLimit).isAfter(maxDate))
                        maxDate = start.clone().add(self.dateLimit);
                    if (maxDate && end.isAfter(maxDate))
                        end = maxDate.clone();

                    // If the end of the range is before the minimum or the start of the range is
                    // after the maximum, don't display self range option at all.
                    if ((self.minDate && end.isBefore(self.minDate, self.timePicker ? 'minute' : 'day')) 
                      || (maxDate && start.isAfter(maxDate, self.timePicker ? 'minute' : 'day')))
                        continue;

                    //Support unicode chars in the range names.
                    let elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    let rangeHtml = elem.value;

                    self.ranges[rangeHtml] = [start, end];
                }
            }

            if (!self.timePicker) {
                self.startDate = self.startDate.startOf('day');
                self.endDate = self.endDate.endOf('day');
            }

            if (self.singleDatePicker) {
                // TODO:
                // The div.daterangepicker width:auto problem needs to be fixed
                // before singleDatePicker can be worked on because the width
                // needs to be 'auto' to readjust the div.daterangepicker width
                // to be smaller because of only one calendar appearing.
                self.singleDatePickerClass = "single";

                // self.container.addClass('single');
                // self.container.find('.calendar.left').addClass('single');
                // self.container.find('.calendar.left').show();
                // self.container.find('.calendar.right').hide();
                // self.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
                // if (self.timePicker) {
                //     self.container.find('.ranges ul').hide();
                // } else {
                //     self.container.find('.ranges').hide();
                // }
            }
        };

        self.init();
        $scope.$on('daterangepicker.reload', () => {
            self.init();
            self.updateView();
        });

        $scope.$on('daterangepicker.change', self.formInputsChanged);

        self.setStartDate = (startDate) => {
            if (typeof startDate === 'string')
              self.startDate = moment(startDate, self.locale.format);


            if (typeof startDate === 'object')
              self.startDate = moment(startDate);

            if (!self.timePicker)
              self.startDate = self.startDate.startOf('day');

            if (self.timePicker && self.timePickerIncrement)
              self.startDate.minute(Math.round(self.startDate.minute() / self.timePickerIncrement) * self.timePickerIncrement);

            if (self.minDate && self.startDate.isBefore(self.minDate)) {
              self.startDate = self.minDate.clone();
       	      if (self.timePicker && self.timePickerIncrement)
                self.startDate.minute(Math.round(self.startDate.minute() / self.timePickerIncrement) * self.timePickerIncrement);
            }

            if (self.maxDate && self.startDate.isAfter(self.maxDate)) {
              self.startDate = self.maxDate.clone();
              if (self.timePicker && self.timePickerIncrement)
                self.startDate.minute(Math.floor(self.startDate.minute() / self.timePickerIncrement) * self.timePickerIncrement);
            }

            if (!self.isShowing)
              self.updateElement();

            self.updateMonthsInView();
        };

        self.setEndDate = (endDate) => {
            if (typeof endDate === 'string')
                self.endDate = moment(endDate, self.locale.format);

            if (typeof endDate === 'object')
                self.endDate = moment(endDate);

            if (!self.timePicker)
                self.endDate = self.endDate.endOf('day');

            if (self.timePicker && self.timePickerIncrement)
                self.endDate.minute(Math.round(self.endDate.minute() / self.timePickerIncrement) * self.timePickerIncrement);

            if (self.endDate.isBefore(self.startDate))
                self.endDate = self.startDate.clone();

            if (self.maxDate && self.endDate.isAfter(self.maxDate))
                self.endDate = self.maxDate.clone();

            if (self.dateLimit && self.startDate.clone().add(self.dateLimit).isBefore(self.endDate))
                self.endDate = self.startDate.clone().add(self.dateLimit);

            if (!self.isShowing)
                self.updateElement();

            self.updateMonthsInView();
        };

        self.updateView = () => {
            if (self.timePicker) {
              self.renderTimePicker('left');
              self.renderTimePicker('right');
              if (!self.endDate) {
              	self.right.calendar.disabled = true;
              } else {
              	self.right.calendar.disabled = false;
              }
            }
            self.updateMonthsInView();
            self.updateCalendars();
            self.initFormInputs();
        };

        self.updateMonthsInView = () => {
            if (self.endDate) {
              //if both dates are visible already, do nothing
              if (!self.singleDatePicker && self.left.calendar.month && self.right.calendar.month &&
                (self.startDate.format('YYYY-MM') == self.left.calendar.month.format('YYYY-MM') || self.startDate.format('YYYY-MM') == self.right.calendar.month.format('YYYY-MM'))
                &&
                (self.endDate.format('YYYY-MM') == self.left.calendar.month.format('YYYY-MM') || self.endDate.format('YYYY-MM') == self.right.calendar.month.format('YYYY-MM'))
                ) {
                return;
              }

              self.left.calendar.month = self.startDate.clone().date(2);
              if (!self.linkedCalendars && (self.endDate.month() != self.startDate.month() || self.endDate.year() != self.startDate.year())) {
                self.right.calendar.month = self.endDate.clone().date(2);
              } else {
                self.right.calendar.month = self.startDate.clone().date(2).add(1, 'month');
              }

            } else {
              if (self.left.calendar.month.format('YYYY-MM') != self.startDate.format('YYYY-MM') && self.right.calendar.month.format('YYYY-MM') != self.startDate.format('YYYY-MM')) {
                self.left.calendar.month = self.startDate.clone().date(2);
                self.right.calendar.month = self.startDate.clone().date(2).add(1, 'month');
              }
            }
            if (self.maxDate && self.linkedCalendars && !self.singleDatePicker && self.right.calendar.month > self.maxDate) {
              self.right.calendar.month = self.maxDate.clone().date(2);
              self.left.calendar.month = self.maxDate.clone().date(2).subtract(1, 'month');
            }
        };

        self.updateCalendars = () => {
            if (self.timePicker) {
              let hour, minute, second;
              let start = self.timePicker24Hour ? 0 : 1;
              let end = self.timePicker24Hour ? 23 : 12;

              if (self.endDate) {
              hour = parseInt(self.hourLeftValue, 10);
              minute = parseInt(self.minuteLeftValue, 10);
              second = self.timePickerSeconds ? parseInt(self.secondLeftValue, 10) : 0;
                if (!self.timePicker24Hour) {
                	let ampm = self.ampmLeftValue;
                  // let ampm = self.container.find('.left .ampmselect').val();
                  if (ampm === 'PM' && hour < 12)
                    hour += 12;
                  if (ampm === 'AM' && hour === 12)
                    hour = 0;
                }
              } else {
              hour = parseInt(self.hourRightValue, 10);
              minute = parseInt(self.minuteRightValue, 10);
              second = self.timePickerSeconds ? parseInt(self.secondRightValue, 10) : 0;
                if (!self.timePicker24Hour) {
                	let ampm = self.ampmRightValue;
                  if (ampm === 'PM' && hour < 12)
                    hour += 12;
                  if (ampm === 'AM' && hour === 12)
                    hour = 0;
                }
              }
              self.left.calendar.month.hour(hour).minute(minute).second(second);
              self.right.calendar.month.hour(hour).minute(minute).second(second);
            }

            self.renderCalendar();

            //highlight any predefined range matching the current start and end dates
            for(let x in self.ranges) {
                self.ranges[x].active = false;
            }
            self.activeRange = null;
                if (self.endDate == null) return;
        };

        self.getArrayWithNumberOfElements = (x) => Array(x);

        self.getArrayWithNumbersBetween = (start, end) => {
          var arr = [];
          for(var i = start+1; i < end; i++) {
            arr.push(i);
          }
          return arr;
        };

        self.getClassesForDay = (row, col, side) => {
          if (self[side] === undefined) return "";
          let calendar = self[side].calendar;
          let classes = [];

          //highlight today's date
          if (calendar[row][col].date.isSame(new Date(), "day"))
              classes.push('today');

          //highlight weekends
          if (calendar[row][col].date.isoWeekday() > 5)
              classes.push('weekend');

          //grey out the dates in other months displayed at beginning and end of this calendar
          if (calendar[row][col].date.month() != calendar[1][1].date.month())
              classes.push('off');

          //don't allow selection of dates before the minimum date
          if (self.minDate && calendar[row][col].date.isBefore(self.minDate, 'day'))
              classes.push('off', 'disabled');

          //don't allow selection of dates after the maximum date
          if (self.maxDate && calendar[row][col].date.isAfter(self.maxDate, 'day'))
              classes.push('off', 'disabled');

          //don't allow selection of date if a custom function decides it's invalid
          if (self.isInvalidDate(calendar[row][col].date))
              classes.push('off', 'disabled');

          //highlight the currently selected start date
          if (calendar[row][col].date.format('YYYY-MM-DD') == self.startDate.format('YYYY-MM-DD'))
              classes.push('active', 'start-date');

          //highlight the currently selected end date
          if (self.endDate != null && calendar[row][col].date.format('YYYY-MM-DD') == self.endDate.format('YYYY-MM-DD'))
              classes.push('active', 'end-date');

          //highlight dates in-between the selected dates
          if (self.endDate != null && calendar[row][col].date > self.startDate && calendar[row][col].date < self.endDate)
              classes.push('in-range');

          //apply custom classes for this date
          let isCustom = self.isCustomDate(calendar[row][col].date);
          if (isCustom !== false) {
              if (typeof isCustom === 'string')
                  classes.push(isCustom);
              else
                  Array.prototype.push.apply(classes, isCustom);
          }

          let cname = '', disabled = false;
          for (let i = 0; i < classes.length; i++) {
              cname += classes[i] + ' ';
              if (classes[i] == 'disabled')
                  disabled = true;
          }
          if (!disabled) {
            cname += 'available';
            self[side].calendar[row][col].available = true;
          } else {
            self[side].calendar[row][col].available = false;
          }
          return cname
        };


        self.renderCalendar = () => {
            //
            // Build the matrix of dates that will populate the calendar
            //

            // Data needed for left calendar
            let sides = ['left', 'right'],
                side, calendar, row, col, curDate;
            for (let x in sides) {
              side = sides[x];
              let month = self[side].calendar.month.month();
              let year = self[side].calendar.month.year();
              let hour = self[side].calendar.month.hour();
              let minute = self[side].calendar.month.minute();
              let second = self[side].calendar.month.second();
              self[side].selectedYear = year + '';
              self[side].selectedMonth = month + '';
              self[side].daysInMonth = moment([self[side].calendar.month.year(), self[side].calendar.month.month()]).daysInMonth();
              self[side].firstDay = moment([self[side].calendar.month.year(), self[side].calendar.month.month(), 1]);
              self[side].lastDay = moment([self[side].calendar.month.year(), self[side].calendar.month.month(), self[side].daysInMonth]);
              self[side].lastMonth = moment(self[side].firstDay).subtract(1, 'month').month();
              self[side].lastYear = moment(self[side].firstDay).subtract(1, 'month').year();
              self[side].daysInLastMonth = moment([self[side].lastYear, self[side].lastMonth]).daysInMonth();
              self[side].dayOfWeek = self[side].firstDay.day();
              self[side].calendar.firstDay = self[side].firstDay;
              self[side].calendar.lastDay = self[side].lastDay;
              for (let i = 0; i < 6; i++) {
                  self[side].calendar[i] = [];
              }
              self[side].startDay = self[side].daysInLastMonth - self[side].dayOfWeek + self.locale.firstDay + 1;
              if (self[side].startDay > self[side].daysInLastMonth)
                self[side].startDay -= 7;
              if (self[side].dayOfWeek == self.locale.firstDay)
                self[side].startDay = self[side].daysInLastMonth - 6;

              curDate = moment([self[side].lastYear, self[side].lastMonth, self[side].startDay, 12, minute, second]);
              for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                  col = 0;
                  row++;
                }
                self[side].calendar[row][col] = {};
                self[side].calendar[row][col].inRange = '';
                self[side].calendar[row][col].date = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (self.minDate && self[side].calendar[row][col].date.format('YYYY-MM-DD') == self.minDate.format('YYYY-MM-DD') && self[side].calendar[row][col].date.isBefore(self.minDate) && side == 'left') {
                  self[side].calendar[row][col].date = self.minDate.clone();
                }

                if (self.maxDate && self[side].calendar[row][col].date.format('YYYY-MM-DD') == self.maxDate.format('YYYY-MM-DD') && self[side].calendar[row][col].date.isAfter(self.maxDate) && side == 'right') {
                  self[side].calendar[row][col].date = self.maxDate.clone();
                }
              }              
              self[side].minDate = side == 'left' ? self.minDate : self.startDate;
              self.maxDate = self.maxDate;
              self.selected = side == 'left' ? self.startDate : self.endDate;
              self.arrow = self.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};
              if (self.endDate == null && self.dateLimit) {
                let maxLimit = self.startDate.clone().add(self.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    self.maxDate = maxLimit;
                }
              }
            }
        };

		self.renderTimePicker = (side) => {
	        // Don't bother updating the time picker if it's currently disabled
	        // because an end date hasn't been clicked yet
	        if (side == 'right' && !self.endDate) return;

	        let minDate, maxDate = self.maxDate;

	        if (self.dateLimit && (!self.maxDate || self.startDate.clone().add(self.dateLimit).isAfter(self.maxDate)))
	          maxDate = self.startDate.clone().add(self.dateLimit);
	        if (side == 'left') {
	          self[side].timeSelected = self.startDate.clone();
	          minDate = self.minDate;
	        } else if (side == 'right') {
	          self[side].timeSelected = self.endDate.clone();
	          minDate = self.startDate;
	          //Preserve the time already selected
            if (!self.endDate) {
              let x = false;
              if (self.hourRightValue) {
                x = true;
                self[side].timeSelected.hour = self.hourRightValue;
              }
              if (self.minuteRightValue) {
                x = true;
                self[side].timeSelected.minute = self.minuteRightValue;
              }
              if (self.secondRightValue) {
                x = true;
                self[side].timeSelected.second = self.secondRightValue;
              }
              if (x) {
                let ampm = self.ampmRightValue;
                if (ampm === 'PM' && self[side].timeSelected.hour() < 12)
                  self[side].timeSelected.hour(self[side].timeSelected.hour() + 12);
                if (ampm === 'AM' && self[side].timeSelected.hour() === 12)
                  self[side].timeSelected.hour(0);
              }
            }
	          if (self[side].timeSelected.isBefore(self.startDate))
	            self[side].timeSelected = self.startDate.clone();
	          if (maxDate && self[side].timeSelected.isAfter(maxDate))
	            self[side].timeSelected = maxDate.clone();
	        }

            self.hourRange = (start, end) => {
              let hourStart = self.timePicker24Hour ? 0 : 1;
              let hourEnd = self.timePicker24Hour ? 23 : 12;
              let range = [];
              for (let i = hourStart; i <= hourEnd; i++) {
              	range.push(i);
              }
              return range;
            };


            self.outputHourDisabled = (i, side) => {
              let i_in_24 = i;
              if (!self.timePicker24Hour)
                i_in_24 = self[side].timeSelected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);
              let time = self[side].timeSelected.clone().hour(i_in_24);
              if (minDate && time.minute(59).isBefore(minDate))
                return true;
              if (maxDate && time.minute(0).isAfter(maxDate))
                return true;
              return false;
            };

	        self.minuteRange = () => {
	        	let padded, range = [];
	        	for(let i = 0; i < 60; i += self.timePickerIncrement) {
	          	padded = i < 10 ? '0' + i : i;
	        		range.push(padded);
	        	}
	        	return range;
	        };
	        self.outputMinuteDisabled = (m, side) => {
	          let time = self[side].timeSelected.clone().minute(m);
	          if (minDate && time.second(59).isBefore(minDate))
	            return true;
	          if (maxDate && time.second(0).isAfter(maxDate))
	            return true;
	        	return false;
	        };

	        self.secondRange = self.minuteRange;

	        self.outputSecondDisabled = (s, side) => {
	          let time = self[side].timeSelected.clone().second(s);
	          if (minDate && time.isBefore(minDate))
	            return true;
	          if (maxDate && time.isAfter(maxDate))
	            return true;
	          return false;
	        };

            self.outputAMPMDisabled = (i, side) => {
                if (i === 'am' && minDate && self[side].timeSelected.clone().hour(12).minute(0).second(0).isBefore(minDate)) {
                  return true;
                } else if (i === 'pm' && maxDate && self[side].timeSelected.clone().hour(0).minute(0).second(0).isAfter(maxDate)) {
                  return true;
                }
                return false;
            };


        if (minDate && self[side].timeSelected.clone().hour(12).minute(0).second(0).isBefore(minDate)) {
            self[side].AMDisabledClass = 'disabled';
        } 
        if (maxDate && self[side].timeSelected.clone().hour(0).minute(0).second(0).isAfter(maxDate)) {
            self[side].PMDisabledClass = 'disabled';
        }
        };

        self.initFormInputs = () => {
        	self.daterangepickerStart = self.startDate ? self.startDate.format(self.locale.format) : null;
        	self.daterangepickerEnd = self.endDate ? self.endDate.format(self.locale.format) : null;
            self.daterangeInputValue = self.daterangepickerStart + ' - ' + (self.daterangepickerEnd !== null ? self.daterangepickerEnd : '');
        };

        self.showCalendars = () => {
          self.showCalendarsClass = 'show-calendar';
          // self.move();
          $scope.$emit('showCalendar.daterangepicker', this);
        };

        self.hoverDate = (row, col, side) => {
          let date = self[side].calendar[row][col].date;

          // We update the start/end inputs to match what the date being hovered on
          if (self.endDate && self.leftInputHasFocus) {
            self.daterangepickerStart = date.format(self.locale.format);
          } else if (!this.endDate && !self.rightInputHasFocus) {
            self.daterangepickerEnd = date.format(self.locale.format);
          }

          // Whenever a start date is hovered over, we check all days displayed and make days that
          // come after marked as in range.
          let day;
          if (!this.endDate) {
            for(let r in self[side].calendar) {
              if (isNaN(r)) continue;
              for(let c in self[side].calendar[r]) {
                if (isNaN(c)) continue;
                day = self[side].calendar[r][c].date;
                if (day.isAfter(self.startDate) && day.isBefore(date) || day.isSame(date, 'day')) {
                  self[side].calendar[r][c].inRange = 'in-range';
                } else {
                  self[side].calendar[r][c].inRange = '';
                }
              }
            }
          }
        };

        self.updateDateWithTimepicker = (side) => {
            // Update the start and end date values to whatever time is shown
            // in the time picker
            let date;
            if (side === 'left') {
                date = self.startDate;
                hour = parseInt(self.hourLeftValue);
                minute = parseInt(self.minuteLeftValue);
                second = parseInt(self.secondLeftValue);
                ampm = self.ampmLeftValue;
            } else if (side === 'right') {
                date = self.endDate;
                hour = parseInt(self.hourRightValue);
                minute = parseInt(self.minuteRightValue);
                second = parseInt(self.secondRightValue);
                ampm = self.ampmRightValue;
            }
            if (!self.timePicker24Hour) {
                let ampm;
                if (side === 'left') {
                    ampm = self.ampmLeftValue;
                } else {
                    ampm = self.ampmRightValue;
                }
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }
            date = date.clone().hour(hour).minute(minute);
            if (timePickerSeconds) {
                date.second(second);
            }
            if (side === 'left') {
                self.setStartDate(date.clone());
            } else if (side === 'right') {
                self.setEndDate(date.clone());
            }
            self.updateView();
        };

        // this function needs to do a few things:
        // * alternate between selecting a start and end date for the range,
        // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
        // * if autoapply is enabled, and an end date was chosen, apply the selection
        // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
        // * if one of the inputs above the calendars was focused, cancel that manual input
        self.clickDate = (row, col, side) => {
            if (!self[side].calendar[row][col].available) return;

            let date = self[side].calendar[row][col].date;

            if (self.endDate || date.isBefore(self.startDate, 'day')) { //picking start
              self.endDate = null;
              self.setStartDate(date.clone());
            } else if (!self.endDate && date.isBefore(self.startDate)) {
              //special case: clicking the same date for start/end,
              //but the time of the end date is before the start date
              self.setEndDate(self.startDate.clone());
            } else {
              self.setEndDate(date.clone());
            }
            if (self.singleDatePicker) {
                self.setEndDate(self.startDate);
            }
            self.updateView();
        };

        /**
         * Set the year using dropdown.  If linked calendar option is enabled,
         * then set other calendar side also.
         */
        self.clickDropdownYear = (side, year) => {
          if(self.linkedCalendars) {
            if (side === "left") {
              self.left.calendar.month.year(year);
              let date = new Date(self.left.calendar.month),
                  m = moment(date);
              self.right.calendar.month.set(m.toObject()).add(1, 'month');
            } else {
              self.right.calendar.month.year(year);
              let date = new Date(self.right.calendar.month),
                  m = moment(date);
              self.left.calendar.month.set(m.toObject()).subtract(1, 'month');
            }
          } else {
            self[side].calendar.month.year(year);
          }
          self.updateCalendars();
        };


        /**
         * Set the month using dropdown.  If linked calendar option is enabled,
         * then set other calendar side also.
         */
        self.clickDropdownMonth = (side, month) => {
          if(self.linkedCalendars) {
            if(side === "left") {
              self.left.calendar.month.month(month);
              let date = new Date(self.left.calendar.month),
                  m = moment(date);
              self.right.calendar.month.set(m.toObject()).add(1, 'month');
            } else {
              self.right.calendar.month.month(month);
              let date = new Date(self.right.calendar.month),
                  m = moment(date);
              self.left.calendar.month.set(m.toObject()).subtract(1, 'month');
            }
          } else {
            self[side].calendar.month.month(month);
          }
          self.updateCalendars();
        };

        self.clickPrev = (side) => {
          if (self.linkedCalendars) {
            self.left.calendar.month.subtract(1, 'month');
            self.right.calendar.month.subtract(1, 'month');
          } else {
            self[side].calendar.month.subtract(1, 'month');
          }
          self.updateCalendars();
        };

        self.clickNext = (side) => {
          if (self.linkedCalendars) {
            self.left.calendar.month.add(1, 'month');
            self.right.calendar.month.add(1, 'month');
          } else {
            self[side].calendar.month.add(1, 'month');
          }
          self.updateCalendars();
        };

        self.clickRange = (label, range) => {
          self.chosenLabel = label;
          if (label === self.locale.customRangeLabel) {
            self.showCalendars();
          } else {
            self.startDate = range[0];
            self.endDate = range[1];
            if (!self.timePicker) {
              self.startDate.startOf('day');
              self.endDate.startOf('day');
            }
            if (!self.alwaysShowCalendars) {
              self.showCalendars = false;
            }
            self.updateView();
          }
        };

        self.updateElement = () => {
          if (!self.singleDatePicker) {
            self.daterangeInputValue = self.startDate.format(self.locale.format) + self.locale.separator + self.endDate.format(self.locale.format);
            $scope.$broadcast('daterangepicker.change');
          }
          self.daterangeInputValue = self.startDate.format(self.locale.format);
        };

        self.formInputsChanged = (event, args) => {

        }
        self.updateView();
		}
    ]
});