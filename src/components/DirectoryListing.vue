<template>
  <table width="100%">
    <tr><td colspan="4">Total: {{ $parent.data.size }}</td></tr>
    <tr>
      <td width="15%">Type</td>
      <td>Name</td>
    </tr>
    <tr v-for="(child, key) in $parent.data.children" :key='key'>
      <td>{{child.type}}</td>
      <td align="right" @click="$parent.updatePath($parent.data.path + '/' + child.basename)">{{child.basename}}</td>
      <td></td>
    </tr>
  </table>
</template>

<script>

export default {
  name: 'DirectoryListing',
  data() {
    return {
      data: {}
    }
  },

  async created() {
  }
  
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table, th, td {
  text-align: left;
}
</style>