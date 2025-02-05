const rootStyles = getComputedStyle(document.documentElement);

export const COLORS = {
  primary: rootStyles.getPropertyValue("--color-primary").trim(),
  secondary: rootStyles.getPropertyValue("--color-secondary").trim(),
  opposite: rootStyles.getPropertyValue("--color-opposite").trim(),
  bg: rootStyles.getPropertyValue("--color-bg").trim(),
};
