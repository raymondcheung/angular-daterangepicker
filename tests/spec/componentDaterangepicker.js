'use strict';

describe('daterangePickerComponent: ', function() {
  var $componentController; 
  var element;
  var $scope;

  beforeEach(module('ngDaterangePicker'));
  beforeEach(inject(function(_$componentController_, $httpBackend, $rootScope, $compile) {
    $httpBackend.whenGET('/daterangepicker.html').respond(200, '');
    $scope = $rootScope.$new();
    element = angular.element('<daterange-picker input-id="config-demo options="{{options}}"></daterange-picker>');
    element = $compile(element)($scope);
    $scope.options = {
        startDate: '11/08/2016',
        endDate: '11/25/2016',
        minDate: '09/01/2015',
        maxDate: '09/01/2017'
    };
    $scope.$apply();
    $componentController = _$componentController_;
  }));

  it('should set self.endDate to end of day if timepicker is not set', function() {
    var scope = $scope.$new();
    var bindings = {
      options: {
        endDate: '11/25/2016',
        timePicker: true
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var momentFormat = moment.localeData().longDateFormat('L');
    expect(ctrl.endDate.format()).toBe(moment('11/25/2016', momentFormat).startOf('day').format());

  });
  it('should set self.endDate to start of day if timepicker is set', function() {
    var bindings = {
      options: {
        endDate: '11/25/2016',
        timePicker: false
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var momentFormat = moment.localeData().longDateFormat('L');
    expect(ctrl.endDate.format()).toBe(moment('11/25/2016', momentFormat).endOf('day').format());
  });

  it('should expose options that are passed in as bindings', function() {
    var bindings = {
      options: {
        startDate: '11/08/2016',
        endDate: '11/25/2016',
        minDate: '09/01/2015',
        maxDate: '09/01/2017',
        dateLimit: false,
        showDropdowns: true,
        showWeekNumbers: true,
        showISOWeekNumbers: true,
        showCustomRangeLabel: false,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        timePickerSeconds: true,
        linkedCalendars: true,
        singleDatePicker: false,
        alwaysShowCalendars: true
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var momentFormat = moment.localeData().longDateFormat('L');
    expect(ctrl.startDate.format()).toBe(moment('11/08/2016', momentFormat).startOf('day').format());
    expect(ctrl.endDate.format()).toBe(moment('11/25/2016', momentFormat).startOf('day').format());
    expect(ctrl.minDate.format()).toBe(moment('09/01/2015', momentFormat).startOf('day').format());
    expect(ctrl.maxDate.format()).toBe(moment('09/01/2017', momentFormat).startOf('day').format());
    expect(ctrl.dateLimit).toBe(false);    
    expect(ctrl.showDropdowns).toBe(true);
    expect(ctrl.showWeekNumbers).toBe(true);
    expect(ctrl.showISOWeekNumbers).toBe(true);
    expect(ctrl.showCustomRangeLabel).toBe(false);
    expect(ctrl.timePicker).toBe(true);
    expect(ctrl.timePicker24Hour).toBe(true);
    expect(ctrl.timePickerIncrement).toBe(1);
    expect(ctrl.timePickerSeconds).toBe(true);
    expect(ctrl.linkedCalendars).toBe(true);
    expect(ctrl.singleDatePicker).toBe(false);
    expect(ctrl.alwaysShowCalendars).toBe(true);
  });
  it('should set the single daterange picker class when the singleDatePicker config is set', function() {
    var bindings = {
      options: {
        singleDatePicker: true
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var classes = ctrl.getDaterangepickerClasses();
    expect(classes).toContain('single');
  });
  it('should set the single daterange picker class when the alwaysShowCalendars config is set', function() {
    var bindings = {
      options: {
        alwaysShowCalendars: true
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var classes = ctrl.getDaterangepickerClasses();
    expect(classes).toContain('single');
  });
  it('should set the show calendar class when the singleDatePicker and alwaysShowCalendars config is not set', function() {
    var bindings = {
      options: {
        alwaysShowCalendars: false,
        singleDatePicker: false
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var classes = ctrl.getDaterangepickerClasses();
    expect(classes).toContain('show-calendar');
  });
  it('should set default locale data if no locale is passed', function() {
    var locale = {
      direction: 'ltr',
      format: moment.localeData().longDateFormat('L'),
      separator: ' - ',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek()
    };
    var ctrl = $componentController('daterangePicker', null, {options: {}});
    expect(ctrl.locale).toEqual(locale);
  });
  it('should set custom locale data if locale config is passed', function() {
    var locale = {
      direction: 'rtl',
      format: 'MM/DD/YYYY HH:mm',
      separator: ' - ',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDay: 0
    };
    var ctrl = $componentController('daterangePicker', null, {options: {locale: locale}});
    expect(ctrl.locale.direction).toBe(locale.direction);
    expect(ctrl.locale.format).toBe(locale.format);
    expect(ctrl.locale.separator).toBe(locale.separator);
    expect(ctrl.locale.fromLabel).toBe(locale.fromLabel);
    expect(ctrl.locale.toLabel).toBe(locale.toLabel);
    expect(ctrl.locale.customRangeLabel).toBe(locale.customRangeLabel);
    expect(ctrl.locale.daysOfWeek).toEqual(locale.daysOfWeek);
    expect(ctrl.locale.monthNames).toEqual(locale.monthNames);
    expect(ctrl.locale.firstDay).toBe(locale.firstDay);
  });
  it('should adjust the first day of the week to the locale.firstDay config passed', function() {
    var locale = {
      daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
      firstDay: 1
    };
    var ctrl = $componentController('daterangePicker', null, {options: {locale: locale}});
    expect(ctrl.locale.daysOfWeek).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr','Sa', 'Su'])
  });
});