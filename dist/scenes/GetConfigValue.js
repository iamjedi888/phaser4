export function GetConfigValue(config, property, defaultValue) {
  if (Object.prototype.hasOwnProperty.call(config, property)) {
    return config[property];
  } else {
    return defaultValue;
  }
}
