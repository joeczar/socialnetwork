import Streak from "../src/helpers/newStreak";
import moment from "moment";

test('Initiating an instance of Streak returns an object with ann array "streak" that has a length equaling the number of days since it\'s startDate', () => {
    const streakObj = {
        title: "Test 3 days",
        description: "A test streak",
        startDate: "2020 08 17",
    };
    const streak3Days = new Streak(streakObj);
    console.log(streak3Days.streak);
    expect(streak3Days.title).toBe("Test 3 days");
    const date = Date("2020 08 17");
    expect(Date(streak3Days.beginning)).toBe(date);
    const streak = streak3Days.streak;
    const length = streak3Days.streakLength;
    expect(streak.length).toBe(length);
});
test("each date has a dateStrings object containing the names and numbers of the days & months as well as the year", () => {
    const streakObj = {
        title: "Test 3 days",
        description: "A test streak",
        startDate: "2020 08 17",
    };
    const streak3Days = new Streak(streakObj);
    streak3Days.streak.forEach((day) => {
        const date = moment(day.streakDate);

        for (let item in day) {
            switch (item) {
                case "day":
                    {
                        expect(day[item].name).toBe(date.format("dddd"));
                        expect(day[item].number).toBe(date.format("D"));
                    }
                    break;
                case "month":
                    {
                        expect(day[item].name).toBe(date.format("MMMM"));
                        expect(day[item].number).toBe(date.format("M"));
                    }
                    break;
                case "year": {
                    expect(day[item]).toBe(date.format("YYYY"));
                }
                default: {
                    console.log(day[item]);
                }
            }
        }
    });
});
