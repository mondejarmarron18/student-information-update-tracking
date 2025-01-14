import { isArray, isObject } from "./validator";

const getContentChanges = (
  prevData: Record<string, unknown>,
  newData: Record<string, unknown>
) => {
  const changes: Record<string, unknown> = {};

  Object.keys(prevData).forEach((prevKey) => {
    const prevValue = prevData[prevKey];
    const newValue = newData[prevKey];

    if (isArray(prevValue) && isArray(newValue)) {
      if (prevValue.length !== newValue.length) {
        changes[prevKey] = [prevValue, newValue];
      }

      return;
    }

    if (isObject(prevValue) && isObject(newValue)) {
      const subValue = getContentChanges(prevValue, newValue);

      if (Object.keys(subValue).length > 0) {
        changes[prevKey] = subValue;
      }

      return;
    }

    if (prevValue !== newValue) {
      changes[prevKey] = [prevValue, newValue];
    }
  });

  return changes;
};

export default getContentChanges;
