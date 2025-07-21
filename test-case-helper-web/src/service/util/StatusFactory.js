
export default class StatusFactory {

    static statuses = new Map([
        ["NOT_TESTING", ["NOT TESTING", "gray"]],
        ["PASSED", ["PASSED", "green"]],
        ["FAILED", ["FAILED", "red"]],
        ["SKIPPED", ["SKIPPED", "blue"]],
        ["BLOCKED", ["BLOCKED", "crimson"]]
    ]);

    static getStatus(status) {
        return this.statuses.get(status);
    }
}