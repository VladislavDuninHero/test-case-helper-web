
export default class StatusFactory {

    static statuses = new Map([
        ["NOT_TESTING", ["notTesting", "gray"]],
        ["PASSED", ["passed", "green"]],
        ["FAILED", ["failed", "red"]],
        ["SKIPPED", ["skipped", "lightblue"]],
        ["BLOCKED", ["blocked", "crimson"]]
    ]);

    static getStatus(status) {
        return this.statuses.get(status);
    }
}