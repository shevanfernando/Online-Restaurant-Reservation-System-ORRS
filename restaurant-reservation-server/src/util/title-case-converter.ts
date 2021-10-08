/**
 * @created 07/10/2021 - 08:49
 * @project settings.json
 * @author  Shevan
 * @file    title-case-converter
 */

const titleCaseConverter = (text: string): string => {
  return text
    .split(' ')
    .map((w: string) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ');
};

export default titleCaseConverter;
