<template>


  <h2 class="title title--orange">File browser</h2>

  <div class="browser__inner">

    <div class="browser__path">
      <span class="browser__path-text">
        Path: {{ data.path }}
      </span>
    </div>

    <div class="breadcrumbs">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item" v-for="(dir, key) in data.pathLinks" :key='key'>
          <button type="button" class="breadcrumbs__button" @click="updatePath(pathDelinkify(key))">
            {{ dir }}
          </button>
        </li>
      </ul>
    </div>

    <div class="browser__content">
      <component :is="viewType"></component>
    </div>



  </div>



</template>

<script>

import DirectoryListing from './DirectoryListing.vue'
import FileViewer from './FileViewer.vue'

const fsNodeViewerMap = {
  Directory: "DirectoryListing",
  File: "FileViewer"
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
        pathLinks.splice(idx + 1)
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
.browser__path {
  padding: 5px 15px;
  border: 1px solid #9a9a9a;
  border-radius: 4px;
  margin-bottom: 30px;
}

.breadcrumbs {
  margin-bottom: 50px;
}

.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.breadcrumbs__button {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  padding: 5px 8px;
  box-shadow: 2px 2px 4px #9a9a9a,
  -2px -2px 4px #ffffff;
  transition: box-shadow 0.3s, color 0.3s;
}

.breadcrumbs__item:not(:last-child) .breadcrumbs__button:after {
  content: '>';
  display: inline-block;
}

.breadcrumbs__item:last-child .breadcrumbs__button {
  pointer-events: none;
  box-shadow: none;
  color: #D05A00;
  position: relative;
}




.breadcrumbs__item:first-child .breadcrumbs__button {
  pointer-events: all;
  box-shadow: 2px 2px 4px #9a9a9a,
  -2px -2px 4px #ffffff;
}
.breadcrumbs__item:first-child .breadcrumbs__button:after {
  content: '>';
  display: inline-block;
}


.breadcrumbs__button:hover {
    color: #D05A00;
}

.breadcrumbs__button:active {
  box-shadow: inset 2px 2px 4px #9a9a9a,
    inset -2px -2px 4px #ffffff;
}
</style>
