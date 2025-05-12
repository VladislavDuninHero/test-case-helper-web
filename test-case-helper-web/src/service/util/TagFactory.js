
export default class TagFactory {

    static tags = new Map([
        ["NOT_ASSIGNED", "NOT_ASSIGNED"],
        ["SMOKE", "SMOKE"],
        ["CRITICAL PATH", "CRITICAL_PATH"]
    ]);

    static getTag(tag) {
        return this.tags.get(tag);
    }
}