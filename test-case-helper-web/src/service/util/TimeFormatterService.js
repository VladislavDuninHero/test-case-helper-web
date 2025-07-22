
export default class TimeFormatterService {
    formatTestSuiteRunTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);

        return `${hours} ч. ${minutes} м.`;
    }
}