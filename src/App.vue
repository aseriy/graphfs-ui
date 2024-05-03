<template>
  <table width="100%">
    <tr valign="top">
      <td width="25%" align="left"><Stats/></td>
      <td width="5%"></td>
      <td align="left"><FileBrowser/></td>
    </tr>
  </table>
</template>

<script>
import Stats from './components/Stats.vue'
import FileBrowser from './components/FileBrowswer.vue'

export default {
  name: 'GraphFS-UI',
  components: {
    Stats,
    FileBrowser
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
