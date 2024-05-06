<template>
  <h1>FILE BROWSER</h1>
  <table width="100%">
    <tr>
      <td colspan="2">Path: {{ fileBrowser.path }}</td>
    </tr>
    <tr>
      <td @click="updateFileBrowser('/')">Root</td>
      <td @click="updateFileBrowser(fileBrowser.directory)">Parent directory</td>
    </tr>
  </table>
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

<script>

export default {
  name: 'Stats',
  props: {
  },
  data() {
    return {
      fileBrowser: {}
    }
  },

  methods: {

    async getFileBrowser(path = null) {
      var uri = '/apis/filestore'
      if (path) {
        uri += path
      }
      const res = await fetch(uri)
      const data = await res.json()
      return data
    },

    async updateFileBrowser(path) {
      if (path === '/') {
        path = null
      }
      this.fileBrowser = await this.getFileBrowser(path)
      console.log(this.fileBrowser)
    }

  },

  async created() {
    this.fileBrowser = await this.getFileBrowser()
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
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
