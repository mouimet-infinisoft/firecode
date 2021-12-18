/**
    * @description      : 
    * @author           : milie
    * @group            : 
    * @created          : 18/12/2021 - 18:35:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2021
    * - Author          : milie
    * - Modification    : 
**/
/* eslint-disable @typescript-eslint/naming-convention */
export enum LOGLEVEL {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

const LOGLEVEL_LABEL = ["ERROR", "WARN", "INFO", "DEBUG"];

export class LogProvider {
  constructor(
    private writers: ILogWriter[],
    private level: LOGLEVEL = LOGLEVEL.ERROR
  ) {}

  private log(loglevel: LOGLEVEL, message: string, source: string = 'Firecode') {
    const currentDate = new Date();
    const localDate = currentDate.toLocaleTimeString();
    const localTime = currentDate.toLocaleTimeString();
    const formattedMessage = `[${localDate} ${localTime}] : [${source}] : [${LOGLEVEL_LABEL[loglevel]}] : ${message}`;

    if (loglevel <= this.level) {
      this.writers.forEach((s) => {
        try {
          s.write(formattedMessage);
        } catch (error) {
          console.error(`[${source}] : LogWriter Error : Unable to write on logwriter source name: ${s.name}`);
        }
      });
    }
  }

  error(message: string) {
    this.log(LOGLEVEL.ERROR, message);
  }

  warn(message: string) {
    this.log(LOGLEVEL.WARN, message);
  }

  info(message: string) {
    this.log(LOGLEVEL.INFO, message);
  }

  debug(message: string) {
    const error = new Error(message);
    this.log(LOGLEVEL.DEBUG, `[message]: ${error.message} : [Stacktrace] : ${error.stack}`);
  }
}

export interface ILogWriter {
  name: string;
  write(message: string): void;
}
