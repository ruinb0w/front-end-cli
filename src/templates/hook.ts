export function generateHookTemplate(baseName: string) {

  return `import { ref } from "vue"

export const use${baseName.charAt(0).toUpperCase() + baseName.slice(1)} = defineStore("${baseName}", () => {
  const state = ref<any>()

  function setState(val:any) {
    state.value = val;
  }

  return { state, setState }
})`;
}
