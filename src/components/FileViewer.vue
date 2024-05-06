<template>
  <table width="100%">
    <tr><td colspan="4">Total: {{ fileBrowser.size }}</td></tr>
    <tr>
      <td width="15%">Type</td>
      <td>Size</td>
      <td>Name</td>
    </tr>
    <tr v-for="(child, key) in fileBrowser.children" :key='key'>
      <td>{{child.type}}</td>
      <td>{{child.size}}</td>
      <td align="right" @click="updateFileBrowser(fileBrowser.path + '/' + child.basename)">{{child.basename}}</td>
      <td></td>
    </tr>
  </table>
</template>
