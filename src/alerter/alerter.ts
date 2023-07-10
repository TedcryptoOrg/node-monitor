export interface Alerter {
    alert(message: string): Promise<void>;
}