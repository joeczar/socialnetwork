import getSlug from "speakingurl";
import moment from "moment";

export default class Streak {
    // input should be YYYY MM DD
    constructor({ title, description, startDate, endDate }) {
        this.title = title;
        this.slug = getSlug(this.title);
        this.description = description;
        this.today = new Date();
        this.beginning = new Date(startDate);
        this.endDate = endDate ? new Date(endDate) : null;
        this.openEnded = !this.endDate ? true : false;
        this.streakLength = this.daysBetween(this.beginning, this.today);
        this.streak = this.getStreakList(this.streakLength);
    }
    save = () => {
        const saved = {
            title: this.title,
            slug: this.slug,
            description: this.description,
            startDate: this.beginning,
            endDate: this.endDate,
            openEnded: this.openEnded,
            streakLength: this.streakLength,
            streak: this.streak,
        };
        return saved;
    };

    daysBetween = () => {
        const today = moment(this.today);
        const beginning = moment(this.beginning);
        return today.diff(beginning, "days");
    };
    getStreakList = () => {
        const strArr = [];

        for (let i = 0; i < this.streakLength; i++) {
            let streakDate = moment(this.beginning).add(i, "d");
            const day = {
                day: {
                    name: streakDate.format("dddd"),
                    number: streakDate.format("D"),
                },
                month: {
                    name: streakDate.format("MMMM"),
                    number: streakDate.format("M"),
                },
                year: streakDate.format("YYYY"),

                streakDate,
                dayNumber: i,
            };
            strArr.push(day);
        }
        return strArr;
    };
    updateStreak = () => {};
}
