
export type LogStack = "frontend";

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export type LogPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export function Log(
  stack: LogStack,
  level: LogLevel,
  pkg: LogPackage,
  message: string
): void {
  
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    stack,
    level,
    package: pkg,
    message,
  };

  
  
  switch (level) {
    case "debug":
      
      console.debug(`[${timestamp}] [${stack}] [${pkg}] [DEBUG] ${message}`, logEntry);
      break;
    case "info":
      
      console.info(`[${timestamp}] [${stack}] [${pkg}] [INFO] ${message}`, logEntry);
      break;
    case "warn":
      
      console.warn(`[${timestamp}] [${stack}] [${pkg}] [WARN] ${message}`, logEntry);
      break;
    case "error":
      
      console.error(`[${timestamp}] [${stack}] [${pkg}] [ERROR] ${message}`, logEntry);
      break;
    case "fatal":
      
      console.error(`[${timestamp}] [${stack}] [${pkg}] [FATAL] ${message}`, logEntry);
      break;
    default:
      
      
      console.log(`[${timestamp}] [${stack}] [${pkg}] [UNKNOWN] ${message}`, logEntry);
  }
}
