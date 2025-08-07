/**
 * Development logger utility
 * Only logs in development environment to keep production clean
 */
const isDevelopment = import.meta.env.MODE === "development";

export const logger = {
  log: (message, data = null) => {
    if (isDevelopment) {
      if (data) {
        console.log(message, data);
      } else {
        console.log(message);
      }
    }
  },

  error: (message, error = null) => {
    if (isDevelopment) {
      if (error) {
        console.error(message, error);
      } else {
        console.error(message);
      }
    }
  },

  warn: (message, data = null) => {
    if (isDevelopment) {
      if (data) {
        console.warn(message, data);
      } else {
        console.warn(message);
      }
    }
  },
};

export default logger;
