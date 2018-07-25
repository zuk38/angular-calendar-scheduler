/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { startOfMinute, startOfDay, startOfWeek, endOfDay, endOfWeek, addMinutes, addHours, addDays, subSeconds, setMinutes, setHours, setDate, setMonth, setYear, isSameSecond, isSameDay, getDay } from 'date-fns';
import { SchedulerConfig } from './scheduler-config';
/** @type {?} */
var WEEKEND_DAY_NUMBERS = [0, 6];
/** @type {?} */
var DAYS_IN_WEEK = 7;
/** @type {?} */
var HOURS_IN_DAY = 24;
/** @type {?} */
var MINUTES_IN_HOUR = 60;
/** @type {?} */
var SECONDS_IN_DAY = 60 * 60 * 24;
/**
 * @record
 */
export function SchedulerView() { }
/** @type {?} */
SchedulerView.prototype.days;
/**
 * @record
 */
export function SchedulerViewDay() { }
/** @type {?} */
SchedulerViewDay.prototype.date;
/** @type {?} */
SchedulerViewDay.prototype.isPast;
/** @type {?} */
SchedulerViewDay.prototype.isToday;
/** @type {?} */
SchedulerViewDay.prototype.isFuture;
/** @type {?} */
SchedulerViewDay.prototype.isWeekend;
/** @type {?} */
SchedulerViewDay.prototype.inMonth;
/** @type {?} */
SchedulerViewDay.prototype.dragOver;
/** @type {?|undefined} */
SchedulerViewDay.prototype.backgroundColor;
/** @type {?|undefined} */
SchedulerViewDay.prototype.cssClass;
/** @type {?} */
SchedulerViewDay.prototype.hours;
/**
 * @record
 */
export function SchedulerViewHour() { }
/** @type {?} */
SchedulerViewHour.prototype.hour;
/** @type {?} */
SchedulerViewHour.prototype.date;
/** @type {?} */
SchedulerViewHour.prototype.segments;
/** @type {?} */
SchedulerViewHour.prototype.isPast;
/** @type {?} */
SchedulerViewHour.prototype.isFuture;
/** @type {?} */
SchedulerViewHour.prototype.hasBorder;
/** @type {?|undefined} */
SchedulerViewHour.prototype.backgroundColor;
/** @type {?|undefined} */
SchedulerViewHour.prototype.cssClass;
/**
 * @record
 */
export function SchedulerViewHourSegment() { }
/** @type {?} */
SchedulerViewHourSegment.prototype.segment;
/** @type {?} */
SchedulerViewHourSegment.prototype.date;
/** @type {?} */
SchedulerViewHourSegment.prototype.events;
/** @type {?} */
SchedulerViewHourSegment.prototype.isPast;
/** @type {?} */
SchedulerViewHourSegment.prototype.isFuture;
/** @type {?} */
SchedulerViewHourSegment.prototype.isDisabled;
/** @type {?} */
SchedulerViewHourSegment.prototype.hasBorder;
/** @type {?|undefined} */
SchedulerViewHourSegment.prototype.backgroundColor;
/** @type {?|undefined} */
SchedulerViewHourSegment.prototype.cssClass;
/**
 * @record
 */
export function CalendarSchedulerEvent() { }
/** @type {?} */
CalendarSchedulerEvent.prototype.id;
/** @type {?} */
CalendarSchedulerEvent.prototype.start;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.end;
/** @type {?} */
CalendarSchedulerEvent.prototype.title;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.content;
/** @type {?} */
CalendarSchedulerEvent.prototype.color;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.actions;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.status;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.cssClass;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.startsBeforeSegment;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.endsAfterSegment;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.isHovered;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.isDisabled;
/** @type {?|undefined} */
CalendarSchedulerEvent.prototype.isClickable;
/** @typedef {?} */
var CalendarSchedulerEventStatus;
export { CalendarSchedulerEventStatus };
/**
 * @record
 */
export function CalendarSchedulerEventAction() { }
/** @type {?|undefined} */
CalendarSchedulerEventAction.prototype.when;
/** @type {?} */
CalendarSchedulerEventAction.prototype.label;
/** @type {?} */
CalendarSchedulerEventAction.prototype.title;
/** @type {?|undefined} */
CalendarSchedulerEventAction.prototype.cssClass;
/** @type {?} */
CalendarSchedulerEventAction.prototype.onClick;
var CalendarSchedulerViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarSchedulerViewComponent(cdr, locale, config) {
        this.cdr = cdr;
        this.config = config;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Specify if the first day of current scheduler view has to be today or the first day of the week
         */
        this.startsWithToday = false;
        /**
         * Specify if actions must be shown or not
         */
        this.showActions = true;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'bottom';
        /**
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * Called when a header week day is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the segment is clicked
         */
        this.segmentClicked = new EventEmitter();
        /**
         * Called when the event is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        this.locale = config.locale || locale;
    }
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.hours = this.getSchedulerViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        if (changes.viewDate || changes.excludeDays) {
            this.refreshHeader();
        }
        if (changes.events || changes.viewDate || changes.excludeDays || changes.dayStartHour || changes.dayEndHour || changes.dayStartMinute || changes.dayEndMinute) {
            this.refreshBody();
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} event
     * @param {?} isHighlighted
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.toggleSegmentHighlight = /**
     * @hidden
     * @param {?} event
     * @param {?} isHighlighted
     * @return {?}
     */
    function (event, isHighlighted) {
        this.days.forEach(function (day) {
            day.hours.forEach(function (hour) {
                // hour.segments.forEach((segment: SchedulerViewHourSegment) => {
                //    if (isHighlighted && segment.events.indexOf(event) > -1) {
                //        segment.backgroundColor = event.color.secondary;
                //    } else {
                //        delete segment.backgroundColor;
                //    }
                // });
                hour.segments.filter(function (segment) { return segment.events.some(function (ev) { return ev.id === event.id && ev.start.getDay() === event.start.getDay(); }); })
                    .forEach(function (segment) {
                    segment.events.filter(function (ev) { return ev.id === event.id && ev.start.getDay() === event.start.getDay(); })
                        .forEach(function (e) {
                        if (isHighlighted) {
                            segment.backgroundColor = e.color.secondary;
                        }
                        else {
                            delete segment.backgroundColor;
                        }
                    });
                });
            });
        });
    };
    /**
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.refreshHeader = /**
     * @return {?}
     */
    function () {
        this.headerDays = this.getSchedulerViewDays({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            startsWithToday: this.startsWithToday,
            excluded: this.excludeDays
        });
    };
    /**
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.refreshBody = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.view = this.getSchedulerView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            startsWithToday: this.startsWithToday,
            excluded: this.excludeDays
        });
        if (this.dayModifier) {
            this.days.forEach(function (day) { return _this.dayModifier(day); });
        }
        if (this.dayModifier || this.hourModifier || this.segmentModifier) {
            this.view.days.forEach(function (day) {
                if (_this.dayModifier) {
                    _this.dayModifier(day);
                }
                day.hours.forEach(function (hour) {
                    if (_this.hourModifier) {
                        _this.hourModifier(hour);
                    }
                    hour.segments.forEach(function (segment) {
                        if (_this.segmentModifier) {
                            _this.segmentModifier(segment);
                        }
                    });
                });
            });
        }
    };
    /**
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.refreshAll = /**
     * @return {?}
     */
    function () {
        this.refreshHeader();
        this.refreshBody();
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.getSchedulerView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        /** @type {?} */
        var events = args.events || [];
        /** @type {?} */
        var viewDate = args.viewDate;
        /** @type {?} */
        var weekStartsOn = args.weekStartsOn;
        /** @type {?} */
        var startsWithToday = args.startsWithToday;
        /** @type {?} */
        var excluded = args.excluded || [];
        /** @type {?} */
        var precision = args.precision || 'days';
        if (!events) {
            events = [];
        }
        /** @type {?} */
        var startOfViewWeek = startsWithToday ? startOfDay(viewDate) : startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        /** @type {?} */
        var endOfViewWeek = startsWithToday ? addDays(endOfDay(viewDate), 6) : endOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        /** @type {?} */
        var eventsInWeek = this.getEventsInPeriod({ events: events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek });
        this.days = this.getSchedulerViewDays({
            viewDate: viewDate,
            weekStartsOn: weekStartsOn,
            startsWithToday: startsWithToday,
            excluded: excluded
        });
        this.days.forEach(function (day, dayIndex) {
            /** @type {?} */
            var hours = [];
            _this.hours.forEach(function (hour, hourIndex) {
                /** @type {?} */
                var segments = [];
                hour.segments.forEach(function (segment, segmentIndex) {
                    segment.date = setDate(setMonth(setYear(segment.date, day.date.getFullYear()), day.date.getMonth()), day.date.getDate());
                    /** @type {?} */
                    var startOfSegment = segment.date;
                    /** @type {?} */
                    var endOfSegment = addMinutes(segment.date, MINUTES_IN_HOUR / _this.hourSegments);
                    /** @type {?} */
                    var evts = _this.getEventsInPeriod({
                        events: eventsInWeek,
                        periodStart: startOfSegment,
                        periodEnd: endOfSegment
                    }).map(function (event) { return ({
                        id: event.id,
                        start: event.start,
                        end: event.end,
                        title: event.title,
                        content: event.content,
                        color: event.color,
                        actions: event.actions,
                        status: event.status,
                        cssClass: event.cssClass,
                        startsBeforeSegment: event.start < startOfSegment,
                        endsAfterSegment: event.end > endOfSegment,
                        isHovered: false,
                        isDisabled: event.isDisabled || false,
                        isClickable: event.isClickable !== undefined && event.isClickable !== null ? event.isClickable : true
                    }); });
                    segments.push(/** @type {?} */ ({
                        segment: segment,
                        date: new Date(segment.date),
                        events: evts,
                        hasBorder: true
                    }));
                });
                /** @type {?} */
                var hourDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), hour.segments[0].date.getHours());
                hours.push(/** @type {?} */ ({ hour: hour, date: hourDate, segments: segments, hasBorder: true }));
            });
            day.hours = hours;
        });
        return /** @type {?} */ ({
            days: this.days
        });
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.isEventInPeriod = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        /** @type {?} */
        var event = args.event;
        /** @type {?} */
        var periodStart = args.periodStart;
        /** @type {?} */
        var periodEnd = args.periodEnd;
        /** @type {?} */
        var eventStart = event.start;
        /** @type {?} */
        var eventEnd = event.end || event.start;
        if (eventStart > periodStart && eventStart < periodEnd) {
            return true;
        }
        if (eventEnd > periodStart && eventEnd < periodEnd) {
            return true;
        }
        if (eventStart < periodStart && eventEnd > periodEnd) {
            return true;
        }
        if (isSameSecond(eventStart, periodStart) || isSameSecond(eventStart, subSeconds(periodEnd, 1))) {
            return true;
        }
        if (isSameSecond(subSeconds(eventEnd, 1), periodStart) || isSameSecond(eventEnd, periodEnd)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.getEventsInPeriod = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        /** @type {?} */
        var events = args.events;
        /** @type {?} */
        var periodStart = args.periodStart;
        /** @type {?} */
        var periodEnd = args.periodEnd;
        return events.filter(function (event) { return _this.isEventInPeriod({ event: event, periodStart: periodStart, periodEnd: periodEnd }); });
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.getSchedulerViewDays = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        /** @type {?} */
        var viewDate = args.viewDate;
        /** @type {?} */
        var weekStartsOn = args.weekStartsOn;
        /** @type {?} */
        var startsWithToday = args.startsWithToday;
        /** @type {?} */
        var excluded = args.excluded || [];
        /** @type {?} */
        var start = startsWithToday ? new Date(viewDate) : startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        /** @type {?} */
        var days = [];
        /** @type {?} */
        var loop = function (i) {
            /** @type {?} */
            var date = addDays(start, i);
            if (!excluded.some(function (e) { return date.getDay() === e; })) {
                days.push(_this.getSchedulerDay({ date: date }));
            }
        };
        for (var i = 0; i < DAYS_IN_WEEK; i++) {
            loop(i);
        }
        return days;
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.getSchedulerDay = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        /** @type {?} */
        var date = args.date;
        /** @type {?} */
        var today = startOfDay(new Date());
        return /** @type {?} */ ({
            date: date,
            isPast: date < today,
            isToday: isSameDay(date, today),
            isFuture: date > today,
            isWeekend: WEEKEND_DAY_NUMBERS.indexOf(getDay(date)) > -1,
            hours: []
        });
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarSchedulerViewComponent.prototype.getSchedulerViewHourGrid = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        /** @type {?} */
        var viewDate = args.viewDate;
        /** @type {?} */
        var hourSegments = args.hourSegments;
        /** @type {?} */
        var dayStart = args.dayStart;
        /** @type {?} */
        var dayEnd = args.dayEnd;
        /** @type {?} */
        var hours = [];
        /** @type {?} */
        var startOfView = setMinutes(setHours(startOfDay(viewDate), dayStart.hour), dayStart.minute);
        /** @type {?} */
        var endOfView = setMinutes(setHours(startOfMinute(endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
        /** @type {?} */
        var segmentDuration = MINUTES_IN_HOUR / hourSegments;
        /** @type {?} */
        var startOfViewDay = startOfDay(viewDate);
        /** @type {?} */
        var range = function (start, end) { return Array.from({ length: ((end + 1) - start) }, function (v, k) { return k + start; }); };
        /** @type {?} */
        var hoursInView = range(dayStart.hour, dayEnd.hour);
        // for (var i = 0; i < HOURS_IN_DAY; i++) {
        hoursInView.forEach(function (hour, i) {
            /** @type {?} */
            var segments = [];
            for (var j = 0; j < hourSegments; j++) {
                /** @type {?} */
                var date = addMinutes(addHours(startOfViewDay, hour), j * segmentDuration);
                if (date >= startOfView && date < endOfView) {
                    segments.push({
                        date: date,
                        isStart: j === 0
                    });
                }
            }
            if (segments.length > 0) {
                hours.push(/** @type {?} */ ({ segments: segments }));
            }
        });
        return hours;
    };
    CalendarSchedulerViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'calendar-scheduler-view',
                    template: "\n        <div class=\"cal-scheduler-view\" #weekViewContainer>\n            <calendar-scheduler-header\n                [days]=\"headerDays\"\n                [locale]=\"locale\"\n                [customTemplate]=\"headerTemplate\"\n                (dayClicked)=\"dayClicked.emit($event)\">\n            </calendar-scheduler-header>\n\n            <div class=\"cal-scheduler\">\n                <div class=\"cal-scheduler-hour-rows aside\">\n                    <div class=\"cal-scheduler-hour align-center horizontal\" *ngFor=\"let hour of hours\">\n                      <div class=\"cal-scheduler-time\">\n                        <div class=\"cal-scheduler-hour-segment\" *ngFor=\"let segment of hour.segments\">\n                            {{ segment.date | calendarDate:'dayViewHour':locale }}\n                        </div>\n                      </div>\n                    </div>\n                </div>\n\n                <div class=\"cal-scheduler-cols aside\">\n                    <div class=\"cal-scheduler-col\" *ngFor=\"let day of view.days\">\n                        <calendar-scheduler-cell\n                            *ngFor=\"let hour of day.hours\"\n                            [ngClass]=\"day?.cssClass\"\n                            [day]=\"day\"\n                            [hour]=\"hour\"\n                            [locale]=\"locale\"\n                            [tooltipPlacement]=\"tooltipPlacement\"\n                            [showActions]=\"showActions\"\n                            [customTemplate]=\"cellTemplate\"\n                            [eventTemplate]=\"eventTemplate\"\n                            (click)=\"dayClicked.emit({date: day})\"\n                            (highlightSegment)=\"toggleSegmentHighlight($event.event, true)\"\n                            (unhighlightSegment)=\"toggleSegmentHighlight($event.event, false)\"\n                            (segmentClicked)=\"segmentClicked.emit({segment: $event.segment})\"\n                            (eventClicked)=\"eventClicked.emit({event: $event.event})\">\n                        </calendar-scheduler-cell>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    styles: [".cal-scheduler-view .cal-scheduler-headers{display:flex;flex-flow:row wrap;margin-bottom:3px;border:1px solid #e1e1e1}.cal-scheduler-view .cal-scheduler-headers .aside{flex:1 0}.cal-scheduler-view .cal-scheduler-headers .aside.cal-header-clock{max-width:5em}.cal-scheduler-view .cal-scheduler-headers .cal-header{flex:1;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cal-scheduler-view .cal-scheduler-headers .cal-header:not(:last-child){border-right:1px solid #e1e1e1}.cal-scheduler-view .cal-scheduler-headers .cal-header:hover{background-color:#ededed}.cal-scheduler-view .cal-scheduler-headers .cal-header.cal-today{background-color:#e8fde7}.cal-scheduler-view .cal-scheduler-headers .cal-header.cal-weekend span{color:#8b0000}.cal-scheduler-view .cal-scheduler-headers .cal-header span{font-weight:400;opacity:.5}.cal-scheduler-view .cal-scheduler,.cal-scheduler-view .cal-scheduler-headers .cal-header-cols{display:flex;flex-flow:row wrap}.cal-scheduler-view .cal-scheduler .aside{flex:1 0}.cal-scheduler-view .cal-scheduler .aside.cal-scheduler-hour-rows{max-width:5em}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows{width:auto!important;border:1px solid #e1e1e1;overflow:hidden;position:relative}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour{display:flex;height:7.25em}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour:nth-child(odd){background-color:#fafafa}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour:not(:last-child){border-bottom:1px solid #e1e1e1}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour .cal-scheduler-time{display:flex;flex-flow:column wrap;width:100%;font-weight:700;text-align:center}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour .cal-scheduler-time .cal-scheduler-hour-segment{flex:1 0}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour .cal-scheduler-time .cal-scheduler-hour-segment:hover{background-color:#ededed}.cal-scheduler-view .cal-scheduler .cal-scheduler-hour-rows .cal-scheduler-hour .cal-scheduler-time .cal-scheduler-hour-segment:not(:last-child){border-bottom:thin dashed #e1e1e1}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols{display:flex;flex-flow:row wrap;border-top:1px solid #e1e1e1}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col{display:flex;flex-flow:column wrap;flex:1 0;border-right:1px solid #e1e1e1}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell{display:flex;flex-flow:column wrap;flex:1 0}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell.cal-today{background-color:#e8fde7}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell.cal-disabled{background-color:#eee;pointer-events:none}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell.cal-disabled .cal-scheduler-events{filter:opacity(50%);-webkit-filter:opacity(50%)}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments{display:flex;flex-flow:column wrap;flex:1 0;border-bottom:1px solid #e1e1e1}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments.no-border{border-bottom:0!important}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments.cal-disabled{background-color:#eee;pointer-events:none}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments.cal-disabled .cal-scheduler-event{filter:opacity(50%);-webkit-filter:opacity(50%)}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment{flex:1 0;display:flex;flex-flow:column wrap}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment:not(.has-events):hover{background-color:#ededed}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment:not(:last-child){border-bottom:thin dashed #e1e1e1}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment.no-border{border-bottom:0!important}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment.cal-disabled{background-color:#eee;pointer-events:none}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events,.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container{flex:1 0;display:flex;flex-flow:column wrap}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event{flex:1 0;display:flex;flex-flow:row wrap;padding:0 10px;font-size:12px;margin:0 2px;line-height:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:all ease-out .2s;filter:brightness(100%);-webkit-filter:brightness(100%);-webkit-backface-visibility:hidden}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event.cal-starts-within-segment{border-top-left-radius:.3em;border-top-right-radius:.3em;margin-top:2px}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event.cal-ends-within-segment{border-bottom-left-radius:.3em;border-bottom-right-radius:.3em;margin-bottom:2px}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event.cal-disabled{background-color:gray!important;filter:grayscale(100%);-webkit-filter:grayscale(100%)}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event.cal-not-clickable{cursor:not-allowed!important}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event:not(.cal-disabled).hovered,.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event:not(.cal-disabled):hover{cursor:pointer;filter:brightness(80%);-webkit-filter:brightness(80%)}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-title-container{position:relative;width:100%}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-title-container .cal-scheduler-event-title{font-size:16px;font-weight:700}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-title-container .cal-scheduler-event-status{position:absolute;top:25%;right:1%;width:16px;height:16px;background:grey;border-radius:50px;border:1px solid #000}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-title-container .cal-scheduler-event-status.ok{background:green}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-title-container .cal-scheduler-event-status.warning{background:orange}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-title-container .cal-scheduler-event-status.danger{background:red}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-content-container{width:100%}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-actions-container{flex:1 0;position:relative}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-actions-container .cal-scheduler-event-actions{position:absolute;bottom:5px;right:0}.cal-scheduler-view .cal-scheduler .cal-scheduler-cols .cal-scheduler-col .cal-scheduler-cell .cal-scheduler-segments .cal-scheduler-segment .cal-scheduler-events .cal-scheduler-event-container .cal-scheduler-event .cal-scheduler-event-actions-container .cal-scheduler-event-actions .cal-scheduler-event-action{text-decoration:none}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    CalendarSchedulerViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
        { type: SchedulerConfig }
    ]; };
    CalendarSchedulerViewComponent.propDecorators = {
        viewDate: [{ type: Input }],
        events: [{ type: Input }],
        hourSegments: [{ type: Input }],
        excludeDays: [{ type: Input }],
        startsWithToday: [{ type: Input }],
        showActions: [{ type: Input }],
        dayModifier: [{ type: Input }],
        hourModifier: [{ type: Input }],
        segmentModifier: [{ type: Input }],
        refresh: [{ type: Input }],
        locale: [{ type: Input }],
        tooltipPlacement: [{ type: Input }],
        weekStartsOn: [{ type: Input }],
        headerTemplate: [{ type: Input }],
        cellTemplate: [{ type: Input }],
        eventTemplate: [{ type: Input }],
        precision: [{ type: Input }],
        dayStartHour: [{ type: Input }],
        dayStartMinute: [{ type: Input }],
        dayEndHour: [{ type: Input }],
        dayEndMinute: [{ type: Input }],
        dayClicked: [{ type: Output }],
        segmentClicked: [{ type: Output }],
        eventClicked: [{ type: Output }]
    };
    return CalendarSchedulerViewComponent;
}());
export { CalendarSchedulerViewComponent };
if (false) {
    /**
     * The current view date
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.viewDate;
    /**
     * An array of events to display on view
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.events;
    /**
     * The number of segments in an hour. Must be <= 6
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.hourSegments;
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.excludeDays;
    /**
     * Specify if the first day of current scheduler view has to be today or the first day of the week
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.startsWithToday;
    /**
     * Specify if actions must be shown or not
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.showActions;
    /**
     * A function that will be called before each cell is rendered. The first argument will contain the calendar (day, hour or segment) cell.
     * If you add the `cssClass` property to the cell it will add that class to the cell in the template
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.dayModifier;
    /** @type {?} */
    CalendarSchedulerViewComponent.prototype.hourModifier;
    /** @type {?} */
    CalendarSchedulerViewComponent.prototype.segmentModifier;
    /**
     * An observable that when emitted on will re-render the current view
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.refresh;
    /**
     * The locale used to format dates
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.locale;
    /**
     * The placement of the event tooltip
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.tooltipPlacement;
    /**
     * The start number of the week
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.weekStartsOn;
    /**
     * A custom template to use to replace the header
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.headerTemplate;
    /**
     * A custom template to use to replace the day cell
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.cellTemplate;
    /**
     * A custom template to use for week view events
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.eventTemplate;
    /**
     * The precision to display events.
     * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.precision;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.dayStartHour;
    /**
     * The day start minutes. Must be 0-59
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.dayStartMinute;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.dayEndHour;
    /**
     * The day end minutes. Must be 0-59
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.dayEndMinute;
    /**
     * Called when a header week day is clicked
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.dayClicked;
    /**
     * Called when the segment is clicked
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.segmentClicked;
    /**
     * Called when the event is clicked
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.eventClicked;
    /**
     * @hidden
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.days;
    /**
     * @hidden
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.headerDays;
    /**
     * @hidden
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.view;
    /**
     * @hidden
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.refreshSubscription;
    /**
     * @hidden
     * @type {?}
     */
    CalendarSchedulerViewComponent.prototype.hours;
    /** @type {?} */
    CalendarSchedulerViewComponent.prototype.cdr;
    /** @type {?} */
    CalendarSchedulerViewComponent.prototype.config;
}
/**
 * @record
 */
export function GetSchedulerViewArgs() { }
/** @type {?|undefined} */
GetSchedulerViewArgs.prototype.events;
/** @type {?} */
GetSchedulerViewArgs.prototype.viewDate;
/** @type {?} */
GetSchedulerViewArgs.prototype.weekStartsOn;
/** @type {?} */
GetSchedulerViewArgs.prototype.startsWithToday;
/** @type {?|undefined} */
GetSchedulerViewArgs.prototype.excluded;
/** @type {?|undefined} */
GetSchedulerViewArgs.prototype.precision;
/**
 * @record
 */
export function GetSchedulerViewHourGridArgs() { }
/** @type {?} */
GetSchedulerViewHourGridArgs.prototype.viewDate;
/** @type {?} */
GetSchedulerViewHourGridArgs.prototype.hourSegments;
/** @type {?} */
GetSchedulerViewHourGridArgs.prototype.dayStart;
/** @type {?} */
GetSchedulerViewHourGridArgs.prototype.dayEnd;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc2NoZWR1bGVyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci1zY2hlZHVsZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvc2NoZWR1bGVyL2NhbGVuZGFyLXNjaGVkdWxlci12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFJakIsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1gsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBTTdDLE9BQU8sRUFDSCxhQUFhLEVBQ2IsVUFBVSxFQUNWLFdBQVcsRUFDWCxRQUFRLEVBQ1IsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFlBQVksRUFDWixTQUFTLEVBQ1QsTUFBTSxFQUNULE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFHckQsSUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFDbkMsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDOztBQUN2QixJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7O0FBQ3hCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQzs7QUFDM0IsSUFBTSxjQUFjLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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TCxLQUFLO2tDQUNMLEtBQUs7MEJBS0wsS0FBSzt5QkFLTCxLQUFLO21DQUtMLEtBQUs7K0JBS0wsS0FBSztpQ0FLTCxLQUFLOytCQUtMLEtBQUs7Z0NBS0wsS0FBSzs0QkFNTCxLQUFLOytCQUtMLEtBQUs7aUNBS0wsS0FBSzs2QkFLTCxLQUFLOytCQUtMLEtBQUs7NkJBS0wsTUFBTTtpQ0FLTixNQUFNOytCQUtOLE1BQU07O3lDQXJSWDs7U0FvS2EsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBMT0NBTEVfSUQsXHJcbiAgICBJbmplY3QsXHJcbiAgICBUZW1wbGF0ZVJlZixcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gICAgRXZlbnRDb2xvcixcclxuICAgIERheVZpZXdIb3VyLFxyXG4gICAgRGF5Vmlld0hvdXJTZWdtZW50XHJcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gICAgc3RhcnRPZk1pbnV0ZSxcclxuICAgIHN0YXJ0T2ZEYXksXHJcbiAgICBzdGFydE9mV2VlayxcclxuICAgIGVuZE9mRGF5LFxyXG4gICAgZW5kT2ZXZWVrLFxyXG4gICAgYWRkTWludXRlcyxcclxuICAgIGFkZEhvdXJzLFxyXG4gICAgYWRkRGF5cyxcclxuICAgIHN1YlNlY29uZHMsXHJcbiAgICBzZXRNaW51dGVzLFxyXG4gICAgc2V0SG91cnMsXHJcbiAgICBzZXREYXRlLFxyXG4gICAgc2V0TW9udGgsXHJcbiAgICBzZXRZZWFyLFxyXG4gICAgaXNTYW1lU2Vjb25kLFxyXG4gICAgaXNTYW1lRGF5LFxyXG4gICAgZ2V0RGF5XHJcbn0gZnJvbSAnZGF0ZS1mbnMnO1xyXG5pbXBvcnQgeyBTY2hlZHVsZXJDb25maWcgfSBmcm9tICcuL3NjaGVkdWxlci1jb25maWcnO1xyXG5cclxuXHJcbmNvbnN0IFdFRUtFTkRfREFZX05VTUJFUlMgPSBbMCwgNl07XHJcbmNvbnN0IERBWVNfSU5fV0VFSyA9IDc7XHJcbmNvbnN0IEhPVVJTX0lOX0RBWSA9IDI0O1xyXG5jb25zdCBNSU5VVEVTX0lOX0hPVVIgPSA2MDtcclxuY29uc3QgU0VDT05EU19JTl9EQVkgPSA2MCAqIDYwICogMjQ7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVkdWxlclZpZXcge1xyXG4gICAgZGF5czogU2NoZWR1bGVyVmlld0RheVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVkdWxlclZpZXdEYXkge1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICAgIGlzUGFzdDogYm9vbGVhbjtcclxuICAgIGlzVG9kYXk6IGJvb2xlYW47XHJcbiAgICBpc0Z1dHVyZTogYm9vbGVhbjtcclxuICAgIGlzV2Vla2VuZDogYm9vbGVhbjtcclxuICAgIGluTW9udGg6IGJvb2xlYW47XHJcbiAgICBkcmFnT3ZlcjogYm9vbGVhbjtcclxuICAgIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcclxuICAgIGNzc0NsYXNzPzogc3RyaW5nO1xyXG4gICAgaG91cnM6IFNjaGVkdWxlclZpZXdIb3VyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2NoZWR1bGVyVmlld0hvdXIge1xyXG4gICAgaG91cjogRGF5Vmlld0hvdXI7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gICAgc2VnbWVudHM6IFNjaGVkdWxlclZpZXdIb3VyU2VnbWVudFtdO1xyXG4gICAgaXNQYXN0OiBib29sZWFuO1xyXG4gICAgaXNGdXR1cmU6IGJvb2xlYW47XHJcbiAgICBoYXNCb3JkZXI6IGJvb2xlYW47XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XHJcbiAgICBjc3NDbGFzcz86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTY2hlZHVsZXJWaWV3SG91clNlZ21lbnQge1xyXG4gICAgc2VnbWVudDogRGF5Vmlld0hvdXJTZWdtZW50O1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICAgIGV2ZW50czogQ2FsZW5kYXJTY2hlZHVsZXJFdmVudFtdO1xyXG4gICAgaXNQYXN0OiBib29sZWFuO1xyXG4gICAgaXNGdXR1cmU6IGJvb2xlYW47XHJcbiAgICBpc0Rpc2FibGVkOiBib29sZWFuO1xyXG4gICAgaGFzQm9yZGVyOiBib29sZWFuO1xyXG4gICAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xyXG4gICAgY3NzQ2xhc3M/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJTY2hlZHVsZXJFdmVudCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgc3RhcnQ6IERhdGU7XHJcbiAgICBlbmQ/OiBEYXRlO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNvbnRlbnQ/OiBzdHJpbmc7XHJcbiAgICBjb2xvcjogRXZlbnRDb2xvcjtcclxuICAgIGFjdGlvbnM/OiBDYWxlbmRhclNjaGVkdWxlckV2ZW50QWN0aW9uW107XHJcbiAgICBzdGF0dXM/OiBDYWxlbmRhclNjaGVkdWxlckV2ZW50U3RhdHVzO1xyXG4gICAgY3NzQ2xhc3M/OiBzdHJpbmc7XHJcbiAgICBzdGFydHNCZWZvcmVTZWdtZW50PzogYm9vbGVhbjtcclxuICAgIGVuZHNBZnRlclNlZ21lbnQ/OiBib29sZWFuO1xyXG4gICAgaXNIb3ZlcmVkPzogYm9vbGVhbjtcclxuICAgIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgaXNDbGlja2FibGU/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDYWxlbmRhclNjaGVkdWxlckV2ZW50U3RhdHVzID0gJ29rJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhclNjaGVkdWxlckV2ZW50QWN0aW9uIHtcclxuICAgIHdoZW4/OiAnZW5hYmxlZCcgfCAnZGlzYWJsZWQnO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBjc3NDbGFzcz86IHN0cmluZztcclxuICAgIG9uQ2xpY2soZXZlbnQ6IENhbGVuZGFyU2NoZWR1bGVyRXZlbnQpOiB2b2lkO1xyXG59XHJcblxyXG4gLy8gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvYS1ndWlkZS10by1mbGV4Ym94L1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY2FsZW5kYXItc2NoZWR1bGVyLXZpZXcnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXNjaGVkdWxlci12aWV3XCIgI3dlZWtWaWV3Q29udGFpbmVyPlxyXG4gICAgICAgICAgICA8Y2FsZW5kYXItc2NoZWR1bGVyLWhlYWRlclxyXG4gICAgICAgICAgICAgICAgW2RheXNdPVwiaGVhZGVyRGF5c1wiXHJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgKGRheUNsaWNrZWQpPVwiZGF5Q2xpY2tlZC5lbWl0KCRldmVudClcIj5cclxuICAgICAgICAgICAgPC9jYWxlbmRhci1zY2hlZHVsZXItaGVhZGVyPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1zY2hlZHVsZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtc2NoZWR1bGVyLWhvdXItcm93cyBhc2lkZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtc2NoZWR1bGVyLWhvdXIgYWxpZ24tY2VudGVyIGhvcml6b250YWxcIiAqbmdGb3I9XCJsZXQgaG91ciBvZiBob3Vyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1zY2hlZHVsZXItdGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXNjaGVkdWxlci1ob3VyLXNlZ21lbnRcIiAqbmdGb3I9XCJsZXQgc2VnbWVudCBvZiBob3VyLnNlZ21lbnRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBzZWdtZW50LmRhdGUgfCBjYWxlbmRhckRhdGU6J2RheVZpZXdIb3VyJzpsb2NhbGUgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtc2NoZWR1bGVyLWNvbHMgYXNpZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXNjaGVkdWxlci1jb2xcIiAqbmdGb3I9XCJsZXQgZGF5IG9mIHZpZXcuZGF5c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Y2FsZW5kYXItc2NoZWR1bGVyLWNlbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBob3VyIG9mIGRheS5ob3Vyc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJkYXk/LmNzc0NsYXNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkYXldPVwiZGF5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtob3VyXT1cImhvdXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2hvd0FjdGlvbnNdPVwic2hvd0FjdGlvbnNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImNlbGxUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRUZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJkYXlDbGlja2VkLmVtaXQoe2RhdGU6IGRheX0pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChoaWdobGlnaHRTZWdtZW50KT1cInRvZ2dsZVNlZ21lbnRIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCB0cnVlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodW5oaWdobGlnaHRTZWdtZW50KT1cInRvZ2dsZVNlZ21lbnRIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCBmYWxzZSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlZ21lbnRDbGlja2VkKT1cInNlZ21lbnRDbGlja2VkLmVtaXQoe3NlZ21lbnQ6ICRldmVudC5zZWdtZW50fSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6ICRldmVudC5ldmVudH0pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvY2FsZW5kYXItc2NoZWR1bGVyLWNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYC5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXItaGVhZGVyc3tkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyB3cmFwO21hcmdpbi1ib3R0b206M3B4O2JvcmRlcjoxcHggc29saWQgI2UxZTFlMX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyLWhlYWRlcnMgLmFzaWRle2ZsZXg6MSAwfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXItaGVhZGVycyAuYXNpZGUuY2FsLWhlYWRlci1jbG9ja3ttYXgtd2lkdGg6NWVtfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXItaGVhZGVycyAuY2FsLWhlYWRlcntmbGV4OjE7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo1cHg7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXItaGVhZGVycyAuY2FsLWhlYWRlcjpub3QoOmxhc3QtY2hpbGQpe2JvcmRlci1yaWdodDoxcHggc29saWQgI2UxZTFlMX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyLWhlYWRlcnMgLmNhbC1oZWFkZXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZWRlZGVkfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXItaGVhZGVycyAuY2FsLWhlYWRlci5jYWwtdG9kYXl7YmFja2dyb3VuZC1jb2xvcjojZThmZGU3fS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXItaGVhZGVycyAuY2FsLWhlYWRlci5jYWwtd2Vla2VuZCBzcGFue2NvbG9yOiM4YjAwMDB9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlci1oZWFkZXJzIC5jYWwtaGVhZGVyIHNwYW57Zm9udC13ZWlnaHQ6NDAwO29wYWNpdHk6LjV9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciwuY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyLWhlYWRlcnMgLmNhbC1oZWFkZXItY29sc3tkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyB3cmFwfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmFzaWRle2ZsZXg6MSAwfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmFzaWRlLmNhbC1zY2hlZHVsZXItaG91ci1yb3dze21heC13aWR0aDo1ZW19LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1ob3VyLXJvd3N7d2lkdGg6YXV0byFpbXBvcnRhbnQ7Ym9yZGVyOjFweCBzb2xpZCAjZTFlMWUxO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWhvdXItcm93cyAuY2FsLXNjaGVkdWxlci1ob3Vye2Rpc3BsYXk6ZmxleDtoZWlnaHQ6Ny4yNWVtfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItaG91ci1yb3dzIC5jYWwtc2NoZWR1bGVyLWhvdXI6bnRoLWNoaWxkKG9kZCl7YmFja2dyb3VuZC1jb2xvcjojZmFmYWZhfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItaG91ci1yb3dzIC5jYWwtc2NoZWR1bGVyLWhvdXI6bm90KDpsYXN0LWNoaWxkKXtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTFlMWUxfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItaG91ci1yb3dzIC5jYWwtc2NoZWR1bGVyLWhvdXIgLmNhbC1zY2hlZHVsZXItdGltZXtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OmNvbHVtbiB3cmFwO3dpZHRoOjEwMCU7Zm9udC13ZWlnaHQ6NzAwO3RleHQtYWxpZ246Y2VudGVyfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItaG91ci1yb3dzIC5jYWwtc2NoZWR1bGVyLWhvdXIgLmNhbC1zY2hlZHVsZXItdGltZSAuY2FsLXNjaGVkdWxlci1ob3VyLXNlZ21lbnR7ZmxleDoxIDB9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1ob3VyLXJvd3MgLmNhbC1zY2hlZHVsZXItaG91ciAuY2FsLXNjaGVkdWxlci10aW1lIC5jYWwtc2NoZWR1bGVyLWhvdXItc2VnbWVudDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNlZGVkZWR9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1ob3VyLXJvd3MgLmNhbC1zY2hlZHVsZXItaG91ciAuY2FsLXNjaGVkdWxlci10aW1lIC5jYWwtc2NoZWR1bGVyLWhvdXItc2VnbWVudDpub3QoOmxhc3QtY2hpbGQpe2JvcmRlci1ib3R0b206dGhpbiBkYXNoZWQgI2UxZTFlMX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHN7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgd3JhcDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTFlMWUxfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2x7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpjb2x1bW4gd3JhcDtmbGV4OjEgMDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNlMWUxZTF9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxse2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6Y29sdW1uIHdyYXA7ZmxleDoxIDB9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsLmNhbC10b2RheXtiYWNrZ3JvdW5kLWNvbG9yOiNlOGZkZTd9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsLmNhbC1kaXNhYmxlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7cG9pbnRlci1ldmVudHM6bm9uZX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwuY2FsLWRpc2FibGVkIC5jYWwtc2NoZWR1bGVyLWV2ZW50c3tmaWx0ZXI6b3BhY2l0eSg1MCUpOy13ZWJraXQtZmlsdGVyOm9wYWNpdHkoNTAlKX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHN7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpjb2x1bW4gd3JhcDtmbGV4OjEgMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTFlMWUxfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cy5uby1ib3JkZXJ7Ym9yZGVyLWJvdHRvbTowIWltcG9ydGFudH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMuY2FsLWRpc2FibGVke2JhY2tncm91bmQtY29sb3I6I2VlZTtwb2ludGVyLWV2ZW50czpub25lfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cy5jYWwtZGlzYWJsZWQgLmNhbC1zY2hlZHVsZXItZXZlbnR7ZmlsdGVyOm9wYWNpdHkoNTAlKTstd2Via2l0LWZpbHRlcjpvcGFjaXR5KDUwJSl9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnR7ZmxleDoxIDA7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpjb2x1bW4gd3JhcH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudDpub3QoLmhhcy1ldmVudHMpOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2VkZWRlZH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudDpub3QoOmxhc3QtY2hpbGQpe2JvcmRlci1ib3R0b206dGhpbiBkYXNoZWQgI2UxZTFlMX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudC5uby1ib3JkZXJ7Ym9yZGVyLWJvdHRvbTowIWltcG9ydGFudH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudC5jYWwtZGlzYWJsZWR7YmFja2dyb3VuZC1jb2xvcjojZWVlO3BvaW50ZXItZXZlbnRzOm5vbmV9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnQgLmNhbC1zY2hlZHVsZXItZXZlbnRzLC5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXJ7ZmxleDoxIDA7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpjb2x1bW4gd3JhcH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudCAuY2FsLXNjaGVkdWxlci1ldmVudHMgLmNhbC1zY2hlZHVsZXItZXZlbnQtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50e2ZsZXg6MSAwO2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IHdyYXA7cGFkZGluZzowIDEwcHg7Zm9udC1zaXplOjEycHg7bWFyZ2luOjAgMnB4O2xpbmUtaGVpZ2h0OjMwcHg7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO3RyYW5zaXRpb246YWxsIGVhc2Utb3V0IC4ycztmaWx0ZXI6YnJpZ2h0bmVzcygxMDAlKTstd2Via2l0LWZpbHRlcjpicmlnaHRuZXNzKDEwMCUpOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW59LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnQgLmNhbC1zY2hlZHVsZXItZXZlbnRzIC5jYWwtc2NoZWR1bGVyLWV2ZW50LWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudC5jYWwtc3RhcnRzLXdpdGhpbi1zZWdtZW50e2JvcmRlci10b3AtbGVmdC1yYWRpdXM6LjNlbTtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czouM2VtO21hcmdpbi10b3A6MnB4fS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXIgLmNhbC1zY2hlZHVsZXItZXZlbnQuY2FsLWVuZHMtd2l0aGluLXNlZ21lbnR7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czouM2VtO2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOi4zZW07bWFyZ2luLWJvdHRvbToycHh9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnQgLmNhbC1zY2hlZHVsZXItZXZlbnRzIC5jYWwtc2NoZWR1bGVyLWV2ZW50LWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudC5jYWwtZGlzYWJsZWR7YmFja2dyb3VuZC1jb2xvcjpncmF5IWltcG9ydGFudDtmaWx0ZXI6Z3JheXNjYWxlKDEwMCUpOy13ZWJraXQtZmlsdGVyOmdyYXlzY2FsZSgxMDAlKX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudCAuY2FsLXNjaGVkdWxlci1ldmVudHMgLmNhbC1zY2hlZHVsZXItZXZlbnQtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50LmNhbC1ub3QtY2xpY2thYmxle2N1cnNvcjpub3QtYWxsb3dlZCFpbXBvcnRhbnR9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnQgLmNhbC1zY2hlZHVsZXItZXZlbnRzIC5jYWwtc2NoZWR1bGVyLWV2ZW50LWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudDpub3QoLmNhbC1kaXNhYmxlZCkuaG92ZXJlZCwuY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudCAuY2FsLXNjaGVkdWxlci1ldmVudHMgLmNhbC1zY2hlZHVsZXItZXZlbnQtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50Om5vdCguY2FsLWRpc2FibGVkKTpob3ZlcntjdXJzb3I6cG9pbnRlcjtmaWx0ZXI6YnJpZ2h0bmVzcyg4MCUpOy13ZWJraXQtZmlsdGVyOmJyaWdodG5lc3MoODAlKX0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudCAuY2FsLXNjaGVkdWxlci1ldmVudHMgLmNhbC1zY2hlZHVsZXItZXZlbnQtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50LXRpdGxlLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXIgLmNhbC1zY2hlZHVsZXItZXZlbnQgLmNhbC1zY2hlZHVsZXItZXZlbnQtdGl0bGUtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50LXRpdGxle2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjcwMH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudCAuY2FsLXNjaGVkdWxlci1ldmVudHMgLmNhbC1zY2hlZHVsZXItZXZlbnQtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50LXRpdGxlLWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudC1zdGF0dXN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjI1JTtyaWdodDoxJTt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQ6Z3JleTtib3JkZXItcmFkaXVzOjUwcHg7Ym9yZGVyOjFweCBzb2xpZCAjMDAwfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXIgLmNhbC1zY2hlZHVsZXItZXZlbnQgLmNhbC1zY2hlZHVsZXItZXZlbnQtdGl0bGUtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50LXN0YXR1cy5va3tiYWNrZ3JvdW5kOmdyZWVufS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXIgLmNhbC1zY2hlZHVsZXItZXZlbnQgLmNhbC1zY2hlZHVsZXItZXZlbnQtdGl0bGUtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50LXN0YXR1cy53YXJuaW5ne2JhY2tncm91bmQ6b3JhbmdlfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXIgLmNhbC1zY2hlZHVsZXItZXZlbnQgLmNhbC1zY2hlZHVsZXItZXZlbnQtdGl0bGUtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50LXN0YXR1cy5kYW5nZXJ7YmFja2dyb3VuZDpyZWR9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnQgLmNhbC1zY2hlZHVsZXItZXZlbnRzIC5jYWwtc2NoZWR1bGVyLWV2ZW50LWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudCAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250ZW50LWNvbnRhaW5lcnt3aWR0aDoxMDAlfS5jYWwtc2NoZWR1bGVyLXZpZXcgLmNhbC1zY2hlZHVsZXIgLmNhbC1zY2hlZHVsZXItY29scyAuY2FsLXNjaGVkdWxlci1jb2wgLmNhbC1zY2hlZHVsZXItY2VsbCAuY2FsLXNjaGVkdWxlci1zZWdtZW50cyAuY2FsLXNjaGVkdWxlci1zZWdtZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50cyAuY2FsLXNjaGVkdWxlci1ldmVudC1jb250YWluZXIgLmNhbC1zY2hlZHVsZXItZXZlbnQgLmNhbC1zY2hlZHVsZXItZXZlbnQtYWN0aW9ucy1jb250YWluZXJ7ZmxleDoxIDA7cG9zaXRpb246cmVsYXRpdmV9LmNhbC1zY2hlZHVsZXItdmlldyAuY2FsLXNjaGVkdWxlciAuY2FsLXNjaGVkdWxlci1jb2xzIC5jYWwtc2NoZWR1bGVyLWNvbCAuY2FsLXNjaGVkdWxlci1jZWxsIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnRzIC5jYWwtc2NoZWR1bGVyLXNlZ21lbnQgLmNhbC1zY2hlZHVsZXItZXZlbnRzIC5jYWwtc2NoZWR1bGVyLWV2ZW50LWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudCAuY2FsLXNjaGVkdWxlci1ldmVudC1hY3Rpb25zLWNvbnRhaW5lciAuY2FsLXNjaGVkdWxlci1ldmVudC1hY3Rpb25ze3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo1cHg7cmlnaHQ6MH0uY2FsLXNjaGVkdWxlci12aWV3IC5jYWwtc2NoZWR1bGVyIC5jYWwtc2NoZWR1bGVyLWNvbHMgLmNhbC1zY2hlZHVsZXItY29sIC5jYWwtc2NoZWR1bGVyLWNlbGwgLmNhbC1zY2hlZHVsZXItc2VnbWVudHMgLmNhbC1zY2hlZHVsZXItc2VnbWVudCAuY2FsLXNjaGVkdWxlci1ldmVudHMgLmNhbC1zY2hlZHVsZXItZXZlbnQtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50IC5jYWwtc2NoZWR1bGVyLWV2ZW50LWFjdGlvbnMtY29udGFpbmVyIC5jYWwtc2NoZWR1bGVyLWV2ZW50LWFjdGlvbnMgLmNhbC1zY2hlZHVsZXItZXZlbnQtYWN0aW9ue3RleHQtZGVjb3JhdGlvbjpub25lfWBdLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJTY2hlZHVsZXJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhclNjaGVkdWxlckV2ZW50W10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBiZSA8PSA2XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCB3aWxsIGJlIGhpZGRlbiBvbiB0aGUgdmlld1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgaWYgdGhlIGZpcnN0IGRheSBvZiBjdXJyZW50IHNjaGVkdWxlciB2aWV3IGhhcyB0byBiZSB0b2RheSBvciB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHN0YXJ0c1dpdGhUb2RheTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSBpZiBhY3Rpb25zIG11c3QgYmUgc2hvd24gb3Igbm90XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHNob3dBY3Rpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgZWFjaCBjZWxsIGlzIHJlbmRlcmVkLiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBjb250YWluIHRoZSBjYWxlbmRhciAoZGF5LCBob3VyIG9yIHNlZ21lbnQpIGNlbGwuXHJcbiAgICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIHRoZSBjZWxsIGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgaW4gdGhlIHRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGRheU1vZGlmaWVyOiBGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIGhvdXJNb2RpZmllcjogRnVuY3Rpb247XHJcbiAgICBASW5wdXQoKSBzZWdtZW50TW9kaWZpZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9ICdib3R0b20nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vla1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSB3ZWVrU3RhcnRzT246IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgZGF5IGNlbGxcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgY2VsbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB3ZWVrIHZpZXcgZXZlbnRzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcHJlY2lzaW9uIHRvIGRpc3BsYXkgZXZlbnRzLlxyXG4gICAgICogYGRheXNgIHdpbGwgcm91bmQgZXZlbnQgc3RhcnQgYW5kIGVuZCBkYXRlcyB0byB0aGUgbmVhcmVzdCBkYXkgYW5kIGBtaW51dGVzYCB3aWxsIG5vdCBkbyB0aGlzIHJvdW5kaW5nXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHByZWNpc2lvbjogJ2RheXMnIHwgJ21pbnV0ZXMnID0gJ2RheXMnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBhIGhlYWRlciB3ZWVrIGRheSBpcyBjbGlja2VkXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBkYXlDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBkYXRlOiBEYXRlIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBzZWdtZW50IGlzIGNsaWNrZWRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHNlZ21lbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBzZWdtZW50OiBTY2hlZHVsZXJWaWV3SG91clNlZ21lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgc2VnbWVudDogU2NoZWR1bGVyVmlld0hvdXJTZWdtZW50IH0+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgY2xpY2tlZFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJTY2hlZHVsZXJFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJTY2hlZHVsZXJFdmVudCB9PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGhpZGRlblxyXG4gICAgICovXHJcbiAgICBkYXlzOiBTY2hlZHVsZXJWaWV3RGF5W107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaGlkZGVuXHJcbiAgICAgKi9cclxuICAgIGhlYWRlckRheXM6IFNjaGVkdWxlclZpZXdEYXlbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBoaWRkZW5cclxuICAgICAqL1xyXG4gICAgdmlldzogU2NoZWR1bGVyVmlldztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBoaWRkZW5cclxuICAgICAqL1xyXG4gICAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGhpZGRlblxyXG4gICAgICovXHJcbiAgICBob3VyczogRGF5Vmlld0hvdXJbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGhpZGRlblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZywgcHJpdmF0ZSBjb25maWc6IFNjaGVkdWxlckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMubG9jYWxlID0gY29uZmlnLmxvY2FsZSB8fCBsb2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaGlkZGVuXHJcbiAgICAgKi9cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaGlkZGVuXHJcbiAgICAgKi9cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaG91cnMgPSB0aGlzLmdldFNjaGVkdWxlclZpZXdIb3VyR3JpZCh7XHJcbiAgICAgICAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICAgICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICAgICAgICBkYXlTdGFydDoge1xyXG4gICAgICAgICAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXHJcbiAgICAgICAgICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF5RW5kOiB7XHJcbiAgICAgICAgICAgICAgICBob3VyOiB0aGlzLmRheUVuZEhvdXIsXHJcbiAgICAgICAgICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMgfHwgY2hhbmdlcy5kYXlTdGFydEhvdXIgfHwgY2hhbmdlcy5kYXlFbmRIb3VyIHx8IGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHwgY2hhbmdlcy5kYXlFbmRNaW51dGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBoaWRkZW5cclxuICAgICAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaGlkZGVuXHJcbiAgICAgKi9cclxuICAgIHRvZ2dsZVNlZ21lbnRIaWdobGlnaHQoZXZlbnQ6IENhbGVuZGFyU2NoZWR1bGVyRXZlbnQsIGlzSGlnaGxpZ2h0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRheXMuZm9yRWFjaCgoZGF5OiBTY2hlZHVsZXJWaWV3RGF5KSA9PiB7XHJcbiAgICAgICAgICAgIGRheS5ob3Vycy5mb3JFYWNoKChob3VyOiBTY2hlZHVsZXJWaWV3SG91cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gaG91ci5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50OiBTY2hlZHVsZXJWaWV3SG91clNlZ21lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmIChpc0hpZ2hsaWdodGVkICYmIHNlZ21lbnQuZXZlbnRzLmluZGV4T2YoZXZlbnQpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBzZWdtZW50LmJhY2tncm91bmRDb2xvciA9IGV2ZW50LmNvbG9yLnNlY29uZGFyeTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVsZXRlIHNlZ21lbnQuYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICBob3VyLnNlZ21lbnRzLmZpbHRlcigoc2VnbWVudDogU2NoZWR1bGVyVmlld0hvdXJTZWdtZW50KSA9PiBzZWdtZW50LmV2ZW50cy5zb21lKChldjogQ2FsZW5kYXJTY2hlZHVsZXJFdmVudCkgPT4gZXYuaWQgPT09IGV2ZW50LmlkICYmIGV2LnN0YXJ0LmdldERheSgpID09PSBldmVudC5zdGFydC5nZXREYXkoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goKHNlZ21lbnQ6IFNjaGVkdWxlclZpZXdIb3VyU2VnbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmV2ZW50cy5maWx0ZXIoKGV2OiBDYWxlbmRhclNjaGVkdWxlckV2ZW50KSA9PiBldi5pZCA9PT0gZXZlbnQuaWQgJiYgZXYuc3RhcnQuZ2V0RGF5KCkgPT09IGV2ZW50LnN0YXJ0LmdldERheSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goKGU6IENhbGVuZGFyU2NoZWR1bGVyRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNIaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmJhY2tncm91bmRDb2xvciA9IGUuY29sb3Iuc2Vjb25kYXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWdtZW50LmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaEhlYWRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlYWRlckRheXMgPSB0aGlzLmdldFNjaGVkdWxlclZpZXdEYXlzKHtcclxuICAgICAgICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXHJcbiAgICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXHJcbiAgICAgICAgICAgIHN0YXJ0c1dpdGhUb2RheTogdGhpcy5zdGFydHNXaXRoVG9kYXksXHJcbiAgICAgICAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoQm9keSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmdldFNjaGVkdWxlclZpZXcoe1xyXG4gICAgICAgICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxyXG4gICAgICAgICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgICAgICAgc3RhcnRzV2l0aFRvZGF5OiB0aGlzLnN0YXJ0c1dpdGhUb2RheSxcclxuICAgICAgICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGF5TW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXlzLmZvckVhY2goZGF5ID0+IHRoaXMuZGF5TW9kaWZpZXIoZGF5KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kYXlNb2RpZmllciB8fCB0aGlzLmhvdXJNb2RpZmllciB8fCB0aGlzLnNlZ21lbnRNb2RpZmllcikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcuZGF5cy5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXlNb2RpZmllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF5TW9kaWZpZXIoZGF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRheS5ob3Vycy5mb3JFYWNoKChob3VyOiBTY2hlZHVsZXJWaWV3SG91cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvdXJNb2RpZmllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdXJNb2RpZmllcihob3VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaG91ci5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50OiBTY2hlZHVsZXJWaWV3SG91clNlZ21lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudE1vZGlmaWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRNb2RpZmllcihzZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldFNjaGVkdWxlclZpZXcoYXJnczogR2V0U2NoZWR1bGVyVmlld0FyZ3MpOiBTY2hlZHVsZXJWaWV3IHtcclxuICAgICAgICBsZXQgZXZlbnRzOiBDYWxlbmRhclNjaGVkdWxlckV2ZW50W10gPSBhcmdzLmV2ZW50cyB8fCBbXTtcclxuICAgICAgICBjb25zdCB2aWV3RGF0ZTogRGF0ZSA9IGFyZ3Mudmlld0RhdGU7XHJcbiAgICAgICAgY29uc3Qgd2Vla1N0YXJ0c09uOiBudW1iZXIgPSBhcmdzLndlZWtTdGFydHNPbjtcclxuICAgICAgICBjb25zdCBzdGFydHNXaXRoVG9kYXk6IGJvb2xlYW4gPSBhcmdzLnN0YXJ0c1dpdGhUb2RheTtcclxuICAgICAgICBjb25zdCBleGNsdWRlZDogbnVtYmVyW10gPSBhcmdzLmV4Y2x1ZGVkIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IHByZWNpc2lvbjogc3RyaW5nID0gYXJncy5wcmVjaXNpb24gfHwgJ2RheXMnO1xyXG5cclxuICAgICAgICBpZiAoIWV2ZW50cykge1xyXG4gICAgICAgICAgICBldmVudHMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0T2ZWaWV3V2VlazogRGF0ZSA9IHN0YXJ0c1dpdGhUb2RheSA/IHN0YXJ0T2ZEYXkodmlld0RhdGUpIDogc3RhcnRPZldlZWsodmlld0RhdGUsIHsgd2Vla1N0YXJ0c09uOiB3ZWVrU3RhcnRzT24gfSk7XHJcbiAgICAgICAgY29uc3QgZW5kT2ZWaWV3V2VlazogRGF0ZSA9IHN0YXJ0c1dpdGhUb2RheSA/IGFkZERheXMoZW5kT2ZEYXkodmlld0RhdGUpLCA2KSA6IGVuZE9mV2Vlayh2aWV3RGF0ZSwgeyB3ZWVrU3RhcnRzT246IHdlZWtTdGFydHNPbiB9KTtcclxuICAgICAgICAvLyBsZXQgbWF4UmFuZ2U6IG51bWJlciA9IERBWVNfSU5fV0VFSyAtIGV4Y2x1ZGVkLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBldmVudHNJbldlZWs6IENhbGVuZGFyU2NoZWR1bGVyRXZlbnRbXSA9IHRoaXMuZ2V0RXZlbnRzSW5QZXJpb2QoeyBldmVudHM6IGV2ZW50cywgcGVyaW9kU3RhcnQ6IHN0YXJ0T2ZWaWV3V2VlaywgcGVyaW9kRW5kOiBlbmRPZlZpZXdXZWVrIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmRheXMgPSB0aGlzLmdldFNjaGVkdWxlclZpZXdEYXlzKHtcclxuICAgICAgICAgICAgdmlld0RhdGU6IHZpZXdEYXRlLFxyXG4gICAgICAgICAgICB3ZWVrU3RhcnRzT246IHdlZWtTdGFydHNPbixcclxuICAgICAgICAgICAgc3RhcnRzV2l0aFRvZGF5OiBzdGFydHNXaXRoVG9kYXksXHJcbiAgICAgICAgICAgIGV4Y2x1ZGVkOiBleGNsdWRlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZGF5cy5mb3JFYWNoKChkYXk6IFNjaGVkdWxlclZpZXdEYXksIGRheUluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaG91cnM6IFNjaGVkdWxlclZpZXdIb3VyW10gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5ob3Vycy5mb3JFYWNoKChob3VyOiBEYXlWaWV3SG91ciwgaG91ckluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzOiBTY2hlZHVsZXJWaWV3SG91clNlZ21lbnRbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaG91ci5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnQsIHNlZ21lbnRJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5kYXRlID0gc2V0RGF0ZShzZXRNb250aChzZXRZZWFyKHNlZ21lbnQuZGF0ZSwgZGF5LmRhdGUuZ2V0RnVsbFllYXIoKSksIGRheS5kYXRlLmdldE1vbnRoKCkpLCBkYXkuZGF0ZS5nZXREYXRlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydE9mU2VnbWVudDogRGF0ZSA9IHNlZ21lbnQuZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRPZlNlZ21lbnQ6IERhdGUgPSBhZGRNaW51dGVzKHNlZ21lbnQuZGF0ZSwgTUlOVVRFU19JTl9IT1VSIC8gdGhpcy5ob3VyU2VnbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBldnRzOiBDYWxlbmRhclNjaGVkdWxlckV2ZW50W10gPSB0aGlzLmdldEV2ZW50c0luUGVyaW9kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBldmVudHNJbldlZWssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmlvZFN0YXJ0OiBzdGFydE9mU2VnbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyaW9kRW5kOiBlbmRPZlNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGV2ZW50OiBDYWxlbmRhclNjaGVkdWxlckV2ZW50KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXJTY2hlZHVsZXJFdmVudD57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZXZlbnQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZXZlbnQuc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGV2ZW50LmVuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGV2ZW50LmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZXZlbnQuY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBldmVudC5hY3Rpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBldmVudC5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogZXZlbnQuY3NzQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydHNCZWZvcmVTZWdtZW50OiBldmVudC5zdGFydCA8IHN0YXJ0T2ZTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kc0FmdGVyU2VnbWVudDogZXZlbnQuZW5kID4gZW5kT2ZTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIb3ZlcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ6IGV2ZW50LmlzRGlzYWJsZWQgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NsaWNrYWJsZTogZXZlbnQuaXNDbGlja2FibGUgIT09IHVuZGVmaW5lZCAmJiBldmVudC5pc0NsaWNrYWJsZSAhPT0gbnVsbCA/IGV2ZW50LmlzQ2xpY2thYmxlIDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKDxTY2hlZHVsZXJWaWV3SG91clNlZ21lbnQ+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBzZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShzZWdtZW50LmRhdGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHM6IGV2dHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0JvcmRlcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaG91ckRhdGU6IERhdGUgPSBuZXcgRGF0ZShkYXkuZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXkuZGF0ZS5nZXRNb250aCgpLCBkYXkuZGF0ZS5nZXREYXRlKCksIGhvdXIuc2VnbWVudHNbMF0uZGF0ZS5nZXRIb3VycygpKTtcclxuICAgICAgICAgICAgICAgIGhvdXJzLnB1c2goPFNjaGVkdWxlclZpZXdIb3VyPnsgaG91cjogaG91ciwgZGF0ZTogaG91ckRhdGUsIHNlZ21lbnRzOiBzZWdtZW50cywgaGFzQm9yZGVyOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGF5LmhvdXJzID0gaG91cnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiA8U2NoZWR1bGVyVmlldz57XHJcbiAgICAgICAgICAgIGRheXM6IHRoaXMuZGF5c1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaXNFdmVudEluUGVyaW9kKGFyZ3M6IHsgZXZlbnQ6IENhbGVuZGFyU2NoZWR1bGVyRXZlbnQsIHBlcmlvZFN0YXJ0OiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlLCBwZXJpb2RFbmQ6IHN0cmluZyB8IG51bWJlciB8IERhdGUgfSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50OiBDYWxlbmRhclNjaGVkdWxlckV2ZW50ID0gYXJncy5ldmVudCwgcGVyaW9kU3RhcnQ6IHN0cmluZyB8IG51bWJlciB8IERhdGUgPSBhcmdzLnBlcmlvZFN0YXJ0LCBwZXJpb2RFbmQ6IHN0cmluZyB8IG51bWJlciB8IERhdGUgPSBhcmdzLnBlcmlvZEVuZDtcclxuICAgICAgICBjb25zdCBldmVudFN0YXJ0OiBEYXRlID0gZXZlbnQuc3RhcnQ7XHJcbiAgICAgICAgY29uc3QgZXZlbnRFbmQ6IERhdGUgPSBldmVudC5lbmQgfHwgZXZlbnQuc3RhcnQ7XHJcblxyXG4gICAgICAgIGlmIChldmVudFN0YXJ0ID4gcGVyaW9kU3RhcnQgJiYgZXZlbnRTdGFydCA8IHBlcmlvZEVuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50RW5kID4gcGVyaW9kU3RhcnQgJiYgZXZlbnRFbmQgPCBwZXJpb2RFbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudFN0YXJ0IDwgcGVyaW9kU3RhcnQgJiYgZXZlbnRFbmQgPiBwZXJpb2RFbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1NhbWVTZWNvbmQoZXZlbnRTdGFydCwgcGVyaW9kU3RhcnQpIHx8IGlzU2FtZVNlY29uZChldmVudFN0YXJ0LCBzdWJTZWNvbmRzKHBlcmlvZEVuZCwgMSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNTYW1lU2Vjb25kKHN1YlNlY29uZHMoZXZlbnRFbmQsIDEpLCBwZXJpb2RTdGFydCkgfHwgaXNTYW1lU2Vjb25kKGV2ZW50RW5kLCBwZXJpb2RFbmQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFdmVudHNJblBlcmlvZChhcmdzOiB7IGV2ZW50czogQ2FsZW5kYXJTY2hlZHVsZXJFdmVudFtdLCBwZXJpb2RTdGFydDogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSwgcGVyaW9kRW5kOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlIH0pOiBDYWxlbmRhclNjaGVkdWxlckV2ZW50W10ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50czogQ2FsZW5kYXJTY2hlZHVsZXJFdmVudFtdID0gYXJncy5ldmVudHMsIHBlcmlvZFN0YXJ0OiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlID0gYXJncy5wZXJpb2RTdGFydCwgcGVyaW9kRW5kOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlID0gYXJncy5wZXJpb2RFbmQ7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50cy5maWx0ZXIoKGV2ZW50KSA9PiB0aGlzLmlzRXZlbnRJblBlcmlvZCh7IGV2ZW50OiBldmVudCwgcGVyaW9kU3RhcnQ6IHBlcmlvZFN0YXJ0LCBwZXJpb2RFbmQ6IHBlcmlvZEVuZCB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTY2hlZHVsZXJWaWV3RGF5cyhhcmdzOiBHZXRTY2hlZHVsZXJWaWV3QXJncyk6IFNjaGVkdWxlclZpZXdEYXlbXSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0RhdGU6IERhdGUgPSBhcmdzLnZpZXdEYXRlO1xyXG4gICAgICAgIGNvbnN0IHdlZWtTdGFydHNPbjogbnVtYmVyID0gYXJncy53ZWVrU3RhcnRzT247XHJcbiAgICAgICAgY29uc3Qgc3RhcnRzV2l0aFRvZGF5OiBib29sZWFuID0gYXJncy5zdGFydHNXaXRoVG9kYXk7XHJcbiAgICAgICAgY29uc3QgZXhjbHVkZWQ6IG51bWJlcltdID0gYXJncy5leGNsdWRlZCB8fCBbXTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBzdGFydHNXaXRoVG9kYXkgPyBuZXcgRGF0ZSh2aWV3RGF0ZSkgOiBzdGFydE9mV2Vlayh2aWV3RGF0ZSwgeyB3ZWVrU3RhcnRzT246IHdlZWtTdGFydHNPbiB9KTtcclxuICAgICAgICBjb25zdCBkYXlzOiBTY2hlZHVsZXJWaWV3RGF5W10gPSBbXTtcclxuICAgICAgICBjb25zdCBsb29wID0gKGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gYWRkRGF5cyhzdGFydCwgaSk7XHJcbiAgICAgICAgICAgIGlmICghZXhjbHVkZWQuc29tZSgoZTogbnVtYmVyKSA9PiBkYXRlLmdldERheSgpID09PSBlKSkge1xyXG4gICAgICAgICAgICAgICAgZGF5cy5wdXNoKHRoaXMuZ2V0U2NoZWR1bGVyRGF5KHsgZGF0ZTogZGF0ZSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgREFZU19JTl9XRUVLOyBpKyspIHtcclxuICAgICAgICAgICAgbG9vcChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTY2hlZHVsZXJEYXkoYXJnczogeyBkYXRlOiBEYXRlIH0pOiBTY2hlZHVsZXJWaWV3RGF5IHtcclxuICAgICAgICBjb25zdCBkYXRlOiBEYXRlID0gYXJncy5kYXRlO1xyXG4gICAgICAgIGNvbnN0IHRvZGF5OiBEYXRlID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxTY2hlZHVsZXJWaWV3RGF5PntcclxuICAgICAgICAgICAgZGF0ZTogZGF0ZSxcclxuICAgICAgICAgICAgaXNQYXN0OiBkYXRlIDwgdG9kYXksXHJcbiAgICAgICAgICAgIGlzVG9kYXk6IGlzU2FtZURheShkYXRlLCB0b2RheSksXHJcbiAgICAgICAgICAgIGlzRnV0dXJlOiBkYXRlID4gdG9kYXksXHJcbiAgICAgICAgICAgIGlzV2Vla2VuZDogV0VFS0VORF9EQVlfTlVNQkVSUy5pbmRleE9mKGdldERheShkYXRlKSkgPiAtMSxcclxuICAgICAgICAgICAgaG91cnM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNjaGVkdWxlclZpZXdIb3VyR3JpZChhcmdzOiBHZXRTY2hlZHVsZXJWaWV3SG91ckdyaWRBcmdzKTogRGF5Vmlld0hvdXJbXSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0RhdGU6IERhdGUgPSBhcmdzLnZpZXdEYXRlLCBob3VyU2VnbWVudHM6IG51bWJlciA9IGFyZ3MuaG91clNlZ21lbnRzLCBkYXlTdGFydDogYW55ID0gYXJncy5kYXlTdGFydCwgZGF5RW5kOiBhbnkgPSBhcmdzLmRheUVuZDtcclxuICAgICAgICBjb25zdCBob3VyczogRGF5Vmlld0hvdXJbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFydE9mVmlldzogRGF0ZSA9IHNldE1pbnV0ZXMoc2V0SG91cnMoc3RhcnRPZkRheSh2aWV3RGF0ZSksIGRheVN0YXJ0LmhvdXIpLCBkYXlTdGFydC5taW51dGUpO1xyXG4gICAgICAgIGNvbnN0IGVuZE9mVmlldzogRGF0ZSA9IHNldE1pbnV0ZXMoc2V0SG91cnMoc3RhcnRPZk1pbnV0ZShlbmRPZkRheSh2aWV3RGF0ZSkpLCBkYXlFbmQuaG91ciksIGRheUVuZC5taW51dGUpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnREdXJhdGlvbjogbnVtYmVyID0gTUlOVVRFU19JTl9IT1VSIC8gaG91clNlZ21lbnRzO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0T2ZWaWV3RGF5OiBEYXRlID0gc3RhcnRPZkRheSh2aWV3RGF0ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogbnVtYmVyW10gPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogKChlbmQgKyAxKSAtIHN0YXJ0KSB9LCAodiwgaykgPT4gayArIHN0YXJ0KTtcclxuICAgICAgICBjb25zdCBob3Vyc0luVmlldzogbnVtYmVyW10gPSByYW5nZShkYXlTdGFydC5ob3VyLCBkYXlFbmQuaG91cik7XHJcblxyXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgSE9VUlNfSU5fREFZOyBpKyspIHtcclxuICAgICAgICBob3Vyc0luVmlldy5mb3JFYWNoKChob3VyOiBudW1iZXIsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhvdXJTZWdtZW50czsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gYWRkTWludXRlcyhhZGRIb3VycyhzdGFydE9mVmlld0RheSwgaG91ciksIGogKiBzZWdtZW50RHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGUgPj0gc3RhcnRPZlZpZXcgJiYgZGF0ZSA8IGVuZE9mVmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0OiBqID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGhvdXJzLnB1c2goPERheVZpZXdIb3VyPnsgc2VnbWVudHM6IHNlZ21lbnRzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdldFNjaGVkdWxlclZpZXdBcmdzIHtcclxuICAgIGV2ZW50cz86IENhbGVuZGFyU2NoZWR1bGVyRXZlbnRbXTtcclxuICAgIHZpZXdEYXRlOiBEYXRlO1xyXG4gICAgd2Vla1N0YXJ0c09uOiBudW1iZXI7XHJcbiAgICBzdGFydHNXaXRoVG9kYXk6IGJvb2xlYW47XHJcbiAgICBleGNsdWRlZD86IG51bWJlcltdO1xyXG4gICAgcHJlY2lzaW9uPzogJ21pbnV0ZXMnIHwgJ2RheXMnO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdldFNjaGVkdWxlclZpZXdIb3VyR3JpZEFyZ3Mge1xyXG4gICAgdmlld0RhdGU6IERhdGU7XHJcbiAgICBob3VyU2VnbWVudHM6IG51bWJlcjtcclxuICAgIGRheVN0YXJ0OiBhbnk7XHJcbiAgICBkYXlFbmQ6IGFueTtcclxufVxyXG4iXX0=