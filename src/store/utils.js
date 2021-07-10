export const updateObject = (obj, updatedObjProps) => {
  return {
    ...obj,
    ...updatedObjProps,
  }
}
