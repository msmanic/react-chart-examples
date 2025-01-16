export const enUs = "en-US";

export const numberFormatter = new Intl.NumberFormat(enUs, {
  style: "decimal",
});

export function convertToTitleCase(input: string) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
}
