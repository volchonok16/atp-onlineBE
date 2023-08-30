export const objectFieldFilter = <T>(obj: any, instance: T): T => {
  for (const key in instance) {
    if (obj.hasOwnProperty(key)) {
      instance[key] = obj[key] as T[typeof key];
    }
  }

  return instance as T;
};
