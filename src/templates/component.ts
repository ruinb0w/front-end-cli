export function generateComTemplate(kebabCaseName: string) {
  return `<script setup lang="ts">

</script>

<template>
  <div class="${kebabCaseName}">
    ${kebabCaseName}
  </div>
</template>

<style lang="scss" scoped></style>`;
}
