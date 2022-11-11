
/**
 * To get item from localstorage
 * @param item string
 * @returns Array of object
 */
export const getItemFromLocalStorage = (item: string) => {
   const itemData = localStorage.getItem(item)
   if (itemData) return JSON.parse(itemData);
}


/**
 * To set item infrom localstorage
 * @param item string
 * @param payload array
 */
export const setItemInLocalStorage = (item: string, payload: any ) => {
   const dataToStore = JSON.stringify(payload);
   localStorage.setItem(item, dataToStore);
}
