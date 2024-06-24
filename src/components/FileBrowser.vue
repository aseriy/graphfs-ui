<template>
  <h1>FILE BROWSER</h1>
  <table width="100%">
    <tr>
      <td colspan="2">
        Path: {{ data.path }}
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <ul v-for="(dir, key) in data.pathLinks" :key='key'>
        <li @click="updatePath(pathDelinkify(key))">
          {{ dir }}
        </li>
      </ul></td>
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
      if (this.data.path !== 'undefined' && this.data.path !== path) {
        if (path === '/') {
          path = null
        }
        this.data = await this.getPath(path)
        this.data.pathLinks = this.pathLinkify(this.data.path)
        console.log("FileBrowser / updatePath(): ", this.data)
        this.viewType = fsNodeViewerMap[this.data.type]
      }
    },

    pathLinkify(path) {
      var pathLinks = ['ROOT']

      if (path != '/') {
        var links = path.split('/')
        links.shift()
        pathLinks = pathLinks.concat(links)
      }

      return pathLinks
    },

    pathDelinkify(idx) {
      var path = '/'

      if (idx > 0) {
        var pathLinks = this.data.pathLinks.slice(0)
        pathLinks[0] = ''
        pathLinks.splice(idx+1)
        path = pathLinks.join('/')
      }

      return path
    }

  },

  async created() {
    this.data = await this.getPath()
    this.data.pathLinks = this.pathLinkify(this.data.path)
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
  padding: 0;
  list-style-type: '/';
}
ul:first-child {
  list-style: none
}
li {
  margin: 0 2px;
  float: left;
}
a {
  color: #42b983;
}
table, th, td {
  text-align: left;
}
</style>
