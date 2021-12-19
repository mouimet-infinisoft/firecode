/**
    * @description      : 
    * @author           : milie
    * @group            : 
    * @created          : 18/12/2021 - 18:34:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2021
    * - Author          : milie
    * - Modification    : 
**/
import { ILogWriter } from "../private";

export const fireLogWriter: ILogWriter = {
    name: "Console",
    write: console.error
};