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

  it('should expose date options that are passed in as bindings', function() {
    var bindings = {
      options: {
        startDate: '11/08/2016',
        endDate: '11/25/2016',
        minDate: '09/01/2015',
        maxDate: '09/01/2017',
        dateLimit: false,
        singleDatePicker: false,
        showDropdowns: true,
        showWeekNumbers: true,
        showISOWeekNumbers: true,
        showCustomRangeLabel: false,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        timePickerSeconds: true,
        linkedCalendars: true,
        alwaysShowCalendars: true
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);
    var momentFormat = moment.localeData().longDateFormat('L');
    expect(ctrl.startDate.format()).toBe(moment('11/08/2016', momentFormat).startOf('day').format());
    expect(ctrl.endDate.format()).toBe(moment('11/25/2016', momentFormat).startOf('day').format());
    expect(ctrl.minDate.format()).toBe(moment('09/01/2015', momentFormat).startOf('day').format());
    expect(ctrl.maxDate.format()).toBe(moment('09/01/2017', momentFormat).startOf('day').format());
  });
});