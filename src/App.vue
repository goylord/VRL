<template>
  <editor />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from './pages/editor/editor.vue'

export default defineComponent({
  name: 'App',
  components: {
    Editor
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
