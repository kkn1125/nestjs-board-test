import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, ...optionalParams);
  }
}
// export class CustomLoggerService implements LoggerService {
//   /**
//    * Write a 'log' level log.
//    */
//   log(message: any, ...optionalParams: any[]) {
//     console.log(message, ...optionalParams);
//   }

//   /**
//    * Write an 'error' level log.
//    */
//   error(message: any, ...optionalParams: any[]) {
//     console.error(message, ...optionalParams);
//   }

//   /**
//    * Write a 'warn' level log.
//    */
//   warn(message: any, ...optionalParams: any[]) {
//     console.warn(message, ...optionalParams);
//   }

//   /**
//    * Write a 'debug' level log.
//    */
//   debug(message: any, ...optionalParams: any[]) {
//     console.debug(message, ...optionalParams);
//   }

//   /**
//    * Write a 'verbose' level log.
//    */
//   verbose(message: any, ...optionalParams: any[]) {
//     console.trace(message, ...optionalParams);
//   }
// }
