document.addEventListener("DOMContentLoaded", function(event) { 
    "use strict";

    /******************* create header date **********************/

    let headerDate = () => {
        let thisDate = new Date();

        let arrayWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        let thisWeekDay = arrayWeek.find((day, index) => {
            return index === thisDate.getDay();
        })

        let thisDay = thisDate.getDate();

        let arrayMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        let thisMonthName = arrayMonth.find((month, index) => {
            return index === thisDate.getMonth();
        })

        let thisYear = thisDate.getFullYear();

        return `${thisWeekDay}, ${thisDay} ${thisMonthName} ${thisYear}`;
    }

    document.getElementById('header-text').innerHTML=headerDate();


    /******************* create weekdays **********************/

    (function weekDays() {
        let arrayWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
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
        let thisDate = new Date();
        let arrayMonthDays = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let thisMonth = thisDate.getMonth();
        let thisYear = thisDate.getFullYear();
        let countDays = [];

        /*********** generate array of days ***********/
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

        /*********** insert days in calendar body ***********/
        
        let weekDays = document.getElementById("calendar-body");
        let div = document.createElement('div');
        div.className = "calendar__body_weekday";
        weekDays.appendChild(div);

        for (let i = 0; i < countDays.length; i++) {
            let span = document.createElement('span');
            span.className = "calendar__body_weekday_cell";
            span.innerHTML = countDays[i];
            div.appendChild(span);
        }
    })();
    
  });