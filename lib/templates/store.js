"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStoreTemplate = generateStoreTemplate;
function generateStoreTemplate(storeName) {
    const baseName = storeName.replace(/Store$/, '').toLowerCase();
    return `import { defineStore } from "pinia"
import { ref } from "vue"

export const use${storeName.charAt(0).toUpperCase() + storeName.slice(1)} = defineStore("${baseName}", () => {
  const state = ref<any>()

  function setState(val:any) {
    return state.value = val;
  }

  return { state, setState }
}, {
  // it's optional only when you need persist storage
  persist: {
    key: '${baseName}',
    storage: localStorage,
  }
})`;
}
