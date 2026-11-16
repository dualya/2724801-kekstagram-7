export const getRandomInteger = (min, max) => {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
