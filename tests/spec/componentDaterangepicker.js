'use strict';

describe('daterangePicker', function() {
  var $componentController,
      scope;

  beforeEach(module('ngDaterangePicker'));

  beforeEach(inject(function($rootScope, _$componentController_) {
    scope = $rootScope.$new();
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