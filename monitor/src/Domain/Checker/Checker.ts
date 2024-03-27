
export default interface Checker {

    toArray(): object

    check(): Promise<void>;
}
