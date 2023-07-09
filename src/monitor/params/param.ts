export interface Param {
    /**
     * @throws {Error} if the param is not valid
     */
    check(): Promise<void>;
}