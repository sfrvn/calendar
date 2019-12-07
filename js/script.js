function getWeekDay() {
    let days = [
        'воскресенье', 
        'понедельник', 
        'вторник', 
        'среда', 
        'четверг', 
        'пятница', 
        'суббота'
    ]
    date = new Date()
    return days[date.getDay()]
}

let currentDate = new Date(),
    currentDateRu = currentDate.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })

function renderCalendar() {
    const months = "Январь,Февраль,Март,Апрель,Май,Июнь,\
    Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь".split(',')

    let today = currentDate.getDay(),
        todayDayNum = new Date(),
        lastMonthDay = new Date(
            currentDate.getFullYear(), 
            currentDate.getMonth() + 1, 
            0).getDate(),
        lastMonthWeekDay = new Date(
            currentDate.getFullYear(), 
            currentDate.getMonth() + 1, 
            0).getDay(),
        lastPrevMonthDay = new Date(
            currentDate.getFullYear(), 
            currentDate.getMonth(), 
            0).getDate()

    document.getElementById("current-day").innerHTML = currentDateRu.toString() // .slice(0, -8) для формата "25 ноября"
    document.getElementById("current-weekday").innerHTML = getWeekDay()

    document.getElementById("selected").innerHTML = "<h3>" + 
        months[currentDate.getMonth()] + " " +
        currentDate.getFullYear() + "</h3>"

    let cells = ""

    for (i = today; i > 0; i--) {
        cells += "<div class=\"prev-month-day\">" +
        "<span class=\"month-day\">" + (lastPrevMonthDay - i + 1) +
        "</span>" + "</div>"
    }

    for (i = 1; i <= lastMonthDay; i++) {
        if (i == todayDayNum.getDate() && 
            currentDate.getMonth() == todayDayNum.getMonth() &&
            currentDate.getFullYear() == todayDayNum.getFullYear()) {
            cells += "<div>" + "<span class=\"today\">" + i +
            "</span>" + "</div>"
        } else {
            cells += "<div>" + "<span class=\"month-day\">" + i +
            "</span>" + "</div>"
        }
    }

    nextMonthCounter = 1
    for (i = lastMonthWeekDay; i < 7; i++) {
        cells += "<div class=\"next-month-day\">" +
        "<span class=\"month-day\">" + nextMonthCounter +
        "</span>" + "</div>"
        nextMonthCounter++
    }

    document.getElementsByClassName("days")[0].innerHTML = cells
}

function moveDate(moveSide) {
    if (moveSide == 'today') {
        currentDate = new Date()
        renderCalendar()
    } else if (moveSide == 'prev') {
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendar()
    } else if (moveSide == 'next') {
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendar()
    }
}