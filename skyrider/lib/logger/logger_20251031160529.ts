/**
 * Simple, clean logger for development and production
 * Logs to console in development, structured logs for production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  stack?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatMessage(level: LogLevel, message: string, context?: Record<string, any>) {
    const timestamp = new Date().toISOString()
    const levelUpper = level.toUpperCase()

    if (this.isDevelopment) {
      const contextStr = context ? ` | ${JSON.stringify(context)}` : ''
      return `[${timestamp}] ${levelUpper}: ${message}${contextStr}`
    }

    // Production: structured JSON
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...(context && { context }),
    })
  }

  debug(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      console.log(this.formatMessage('debug', message, context))
    }
  }

  info(message: string, context?: Record<string, any>) {
    console.info(this.formatMessage('info', message, context))
  }

  warn(message: string, context?: Record<string, any>) {
    console.warn(this.formatMessage('warn', message, context))
  }

  error(message: string, context?: Record<string, any>) {
    console.error(this.formatMessage('error', message, context))
  }
}

export const logger = new Logger()
