import { ILogWriter } from "../private";

export const fireLogWriter: ILogWriter = {
    name: "Console",
    write: console.error
}