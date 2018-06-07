document.addEventListener("DOMContentLoaded", function(event) { 
    "use strict";

    let thisDate = new Date();
    let arrayWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    let arrayMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let arrayMonthDays = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let thisDay = thisDate.getDate();
    let thisYear = thisDate.getFullYear();
    let thisMonth = thisDate.getMonth();

    /******************* create header date **********************/

    let headerDate = () => {
        let thisWeekDayName = arrayWeek.find((day, index) => {
            return index === thisDate.getDay();
        });
        let thisMonthName = arrayMonth.find((month, index) => {
            return index === thisDate.getMonth();
        });
        return `${thisWeekDayName}, ${thisDay} ${thisMonthName} ${thisYear}`;
    }

    document.getElementById('header-text').innerHTML=headerDate();

    /******************* create weekdays **********************/

    (function weekDays() {
        let weekDays = document.getElementById("week-days");
        for (let i = 0; i < arrayWeek.length; i++) {
            let div = document.createElement('span');
            div.className = "calendar__body_weekday_cell";
            div.innerHTML = arrayWeek[i];
            weekDays.appendChild(div);
        }
    })();

    /******************* create month days **********************/

    (function monthDays() {

        /*********** generate array of days ***********/

        /* generate days of previous month */
        let prevCountDays = [];
        let firstDay = new Date(thisYear, thisMonth, 1);
        let prewDays = firstDay.getDay() - 1;
        if (prewDays == -1) prewDays = 6;
        let prewMonth = arrayMonthDays[thisMonth - 1];
        for(let i = prewMonth - prewDays; i != prewMonth; i++) {
            prevCountDays.push(i);
        }

        /* generate days of this month */
        let countDays = [];
        if (thisMonth === 1) {
            if (thisYear % 4 === 0) {
                for (let i = 1; i <= arrayMonthDays[1][1]; i++) {
                    countDays.push(i);
                }
            } else {
                for (let i = 1; i <= arrayMonthDays[1][0]; i++) {
                    countDays.push(i);
                }
            }
        } else {
            for (let i = 1; i <= arrayMonthDays[thisMonth]; i++) {
                countDays.push(i);
            }
        }

        /* generate days of next month */
        let nextCountDays = [];
        let lastDay = new Date(thisYear, thisMonth, countDays.length);
        let nextDays = 7 - lastDay.getDay();
        if (nextDays == 7) nextDays = 0;
        let nextMonth = arrayMonthDays[thisMonth + 1];
        for(let i = nextMonth - nextDays; i != nextMonth; i++) {
            nextCountDays.push(i);
        }

        /*********** insert days in calendar body ***********/
        
        let weekDays = document.getElementById("calendar-body");
        let div = document.createElement('div');
        div.className = "calendar__body_weekday";
        weekDays.appendChild(div);

        generateDays(prevCountDays, "another", div);
        generateDays(countDays, "calendar__body_weekday_cell", div);
        generateDays(nextCountDays, "another", div);
    })();

    /******************* help function for insert days **********************/
    
    function generateDays(array, className, div) {
        for (let i = 0; i < array.length; i++) {
            let span = document.createElement('span');
            span.className = className;
            span.innerHTML = array[i];
            div.appendChild(span);
        }
    }
    
  });