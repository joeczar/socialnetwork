/*
    this datastructure needs to hold the individual Date Objects, the length of the streak in Days, Months and Years
*/
import getSlug from "speakingurl";
import moment from "moment";

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export default class Streak {
    // input should be YYYY MM DD
    constructor(streak) {
        this.title = streak.title;
        this.slug = getSlug(this.title);
        this.description = streak.description;
        this.today = new Date();
        this.beginning = new Date(streak.startDate);
        this.endDate = new Date(streak.endDate) || null;
        this.openEnded = !this.endDate ? true : false;
        this.streakLength = this.daysBetween(this.beginning, this.today);
        this.streak = this.getStreakList(this.streakLength);
        this.savedStreaks = streak.streak || null;
    }
    save = () => {
        return {
            title: this.title,
            description: this.description,
            startDate: this.beginning,
            endDate: this.endDate,
            openEnded: this.openEnded,
            streakLength: this.streakLength,
            streak: this.streak,
        };
    };
    daysBetween = () => {
        const oneDay = 1000 * 60 * 60 * 24;

        const differenceMilli = Math.abs(this.today - this.beginning);
        return Math.round(differenceMilli / oneDay);
    };
    getStreakList = () => {
        const strArr = [];
        for (let i = 0; i < this.streakLength; i++) {
            let streakDate = this.beginning.addDays(i);
            strArr.push({
                dateStrings: streakDate.toDateString().split(" "),
                streakDate,
                day: i,
            });
        }
        return strArr;
    };

    getMonthsAndYears = () => {
        const mySet = new Set();

        for (let i = 0; i < this.streak.length; i++) {
            const date = this.streak[i];
            const monthName = getMonthName(date.streakDate);
            const totalDaysInMonth = daysInMonth(date);
            const year = date.streakDate.getFullYear();
            const key = `${monthName}_${year}`;

            mySet.add(`${key} ${totalDaysInMonth}`);
        }
        return mySet;
    };
    groupByMonth = () => {
        const monthsArr = [];
        const months = this.getMonthsAndYears();
        const dates = this.streak;

        for (let month of months) {
            const monthArr = month.split(" ");

            const filterDates = dates.filter(
                (date) =>
                    getMonthName(date) === monthArr[0] &&
                    date.dateStrings[3] === monthArr[1]
            );

            monthsArr.push([
                `${monthArr[0]} ${monthArr[1]}`,
                Number(monthArr[2]),
                filterDates,
            ]);
        }

        return monthsArr;
    };

    // I have a feeling this could be much better!
    numberOfMonths = 0;

    getChip = (date) => {
        // add congratulatory message for milestones §0, 60, 90 days and beyond
        const dayNumber = date.day;
        const startDate = this.beginning.getDate();
        const thisDate = date.streakDate.getDate();
        const monthDiff = (d1, d2) => {
            return (
                d2.getMonth() -
                d1.getMonth() +
                12 * (d2.getFullYear() - d1.getFullYear())
            );
        };

        const numberOfMonths = monthDiff(this.beginning, date.streakDate);

        const monthOrMonths = () => {
            if (numberOfMonths !== 1) {
                return "months";
            }
            return "month";
        };

        if (dayNumber === 30 || dayNumber === 60 || dayNumber === 90) {
            return `Congratulations for ${dayNumber} days!`;
        } else if (
            thisDate === startDate &&
            dayNumber !== 0 &&
            numberOfMonths < 12
        ) {
            return `Congratulations for ${numberOfMonths} ${monthOrMonths()}!`;
        } else if (
            numberOfMonths % 12 === 0 &&
            thisDate === startDate &&
            dayNumber !== 0
        ) {
            return `Wow! Way to go on year ${numberOfMonths / 12}`;
        }
        return "";
    };
}
const getMonthName = (date) => {
    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const getMonth = new Date(date).getMonth();
    return month[getMonth];
};
function daysInMonth(date) {
    // console.log(date.streakDate);
    const getMonth = new Date(date.streakDate);
    const month = getMonth.getMonth() + 1;
    const year = date.dateStrings[3];

    return new Date(year, month, 0).getDate();
}
