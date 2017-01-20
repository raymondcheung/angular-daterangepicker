### Date Range Picker for AngularJS - [AngularJS](https://github.com/angular/angular.js/) implementation of [Date Range Picker for Bootstrap](https://github.com/dangrossman/bootstrap-daterangepicker)

### Links:
- [Demo](#demo)
- [Tests](#tests)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Options](#options)
- [Contributing](#contributing)
- [Licensing](#licensing)

# Demo
https://raymondcheung.github.io/angular-daterangepicker/demo.html

# Installation
Currently, this is in development.  So, the only way to install it is to either clone it from this repo, or download it as a zip and unpack it to your project.  Once it's in your project, and has been included(require.js, \<script>, etc.), then you can use by adding the tag do your views.

\<daterange-picker input-id="config-demo" options="options">\</daterange-picker>

See [options](#options) to learn about configuring it.

# Dependencies
AngularJS 1.5+
Moment.js 2.15.2+

# Tests
After doing an 'npm install' and 'bower install', execute './node_modules/karma/bin/karma start' from the top level of this project to execute unit tests.
# Options
## Dropped(configurations from Bootstrap Daterange Picker that will not be ported)
- parentEl
- drops: (string: 'down' or 'up') Whether the picker appears below (default) or above the HTML element it's attached to
- opens: (string: 'left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to
- autoUpdateInput: (boolean) Indicates whether the date range picker should automatically update the value of an <input> element it's attached to at initialization and when the selected dates change.
- alwaysShowCalendars: (boolean) Normally, if you use the ranges option to specify pre-defined date ranges, calendars for choosing a custom date range are not shown until the user clicks "Custom Range". When this option is set to true, the calendars for choosing a custom date range are always shown instead.

## Unsupported(no decision yet on whether it will be worked on)
- autoApply: (boolean) Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates or a predefined range is selected
- applyClass: (string) CSS class string that will be added to the apply button
- cancelClass: (string) CSS class string that will be added to the cancel button
- isInvalidDate: (function) A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
- isCustomDate: (function) A function that is passed each date in the two calendars before they are displayed, and may return a string or array of CSS class names to apply to that date's calendar cell.

## Not yet fully implemented
- dateLimit: (object) The maximum span between the selected start and end dates. Can have any property you can add to a moment object (i.e. days, months)
- buttonClasses: (array) CSS class names that will be added to all buttons in the picker
- showCustomRangeLabel: (boolean) Displays an item labeled "Custom Range" at the end of the list of predefined ranges, when the ranges option is used. This option will be highlighted whenever the current date range selection does not match one of the predefined ranges. Clicking it will display the calendars to select a new range.

## Currently functional
- startDate (Date object, moment object or string) The start of the initially selected date range
- endDate: (Date object, moment object or string) The end of the initially selected date range
- minDate: (Date object, moment object or string) The earliest date a user may select
- maxDate: (Date object, moment object or string) The latest date a user may select
- locale: (object) Allows you to provide localized strings for buttons and labels, customize the date format, and change the first day of week for the calendars. Check off "locale (with example settings)" in the configuration generator to see how to customize these options.
- showDropdowns: (boolean) Show year and month select boxes above calendars to jump to a specific month and year
- showWeekNumbers: (boolean) Show localized week numbers at the start of each week on the calendars
- showISOWeekNumbers: (boolean) Show ISO week numbers at the start of each week on the calendars
- linkedCalendars: (boolean) When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars. When disabled, the two calendars can be individually advanced and display any month/year.
- ranges: (object) Set predefined date ranges the user can select from. Each key is the label for the range, and its value an array with two dates representing the bounds of the range
- autoUpdateInput
- timePicker: (boolean) Allow selection of dates with times, not just dates
- timePickerIncrement: (number) Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30)
- timePicker24Hour: (boolean) Use 24-hour instead of 12-hour times, removing the AM/PM selection
- timePickerSeconds: (boolean) Show seconds in the timePicker
- singleDatePicker: (boolean) Show only a single calendar to choose one date, instead of a range picker with two calendars; the start and end dates provided to your callback will be the same single date chosen

# Contributing
I'm always looking for extra help, but currently I am only able to work on this a few hours a week.  Also, there very few unit tests to gaurantee against unintended breakage.  So, pull requests will be very carefully and slowly reviewed.  Once I have a more comprehensive unit test suite up, and can run them to verify nothing breaks upon merging, approvals will come faster.

# Licensing

This code is made available under the same license as Bootstrap. Moment.js is included in this repository
for convenience. It is available under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

--

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
