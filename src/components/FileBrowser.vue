<template>
  <h1>FILE BROWSER</h1>
  <table width="100%">
    <tr>
      <td colspan="2">Path: {{ data.path }}</td>
    </tr>
    <tr>
      <td @click="updatePath('/')">Root</td>
      <td @click="updatePath(data.directory)">Parent directory</td>
    </tr>
    <tr>
      <td colspan="2">
        <component :is="viewType"></component>
      </td>
    </tr>

</table>
</template>

<script>

import DirectoryListing from './DirectoryListing.vue'
import FileViewer from './FileViewer.vue'

const fsNodeViewerMap = {
  Directory:  "DirectoryListing",
  File:       "FileViewer"
}

export default {
  name: 'FileBrowser',
  components: {
    DirectoryListing,
    FileViewer
  },

  props: {
  },

  data() {
    return {
      viewType: null,
      data: {}
    }
  },

  methods: {

    async getPath(path = null) {
      var uri = '/apis/filestore'
      if (path) {
        uri += path
      }
      const res = await fetch(uri)
      const data = await res.json()
      return data
    },

    async updatePath(path) {
      if (path === '/') {
        path = null
      }
      this.data = await this.getPath(path)
      console.log("FileBrowser / updatePath(): ", this.data)
      this.viewType = fsNodeViewerMap[this.data.type]
    }

  },

  async created() {
    this.data = await this.getPath()
    console.log("FileBrowser / created(): ", this.data)
    this.viewType = fsNodeViewerMap[this.data.type]
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
