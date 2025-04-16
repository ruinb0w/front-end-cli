"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComTemplate = generateComTemplate;
function generateComTemplate(kebabCaseName) {
    return `<script setup lang="ts">

</script>

<template>
  <div class="${kebabCaseName}">
    ${kebabCaseName}
  </div>
</template>

<style lang="scss" scoped></style>`;
}
