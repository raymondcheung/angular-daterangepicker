'use strict';

describe('daterangePickerComponent: ', function() {
  var $componentController;

  var mockMoment = {
    
  };

  beforeEach(module('ngDaterangePicker'));
  beforeEach(inject(function($injector, _$componentController_) {
    $componentController = _$componentController_;
  }));

  it('should accept options passed to it', function() {
    var bindings = {
      options: {
        startDate: '11/08/2016',
        endDate: '11/25/2016',
        minDate: '09/01/2015',
        maxDate: '09/01/2017'
      }
    };
    var ctrl = $componentController('daterangePicker', null, bindings);

    expect(ctrl.startDate).toBe('11/08/2016');
    expect(ctrl.endDate).toBe('11/25/2016');
    expect(ctrl.minDate).toBe('09/01/2015');
    expect(ctrl.maxDate).toBe('09/01/2017');
  });
});