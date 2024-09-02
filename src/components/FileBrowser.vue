<template>
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
            <div v-if="!key">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V4C20 2.897 19.103 2 18 2H6ZM6 17V5H18L18.002 17H6Z" fill="black" />
              </svg>
            </div>
            <div v-else>
              {{ dir }}
            </div>
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
  border: 1px solid var(--light);
  border-radius: 4px;
  margin-bottom: 15px;
  color: var(--light);
}

.breadcrumbs {
  margin-bottom: 60px;
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
  background-color: var(--grey);
  border-radius: 4px;
  padding: 3px 8px;
  color: var(--green-300);
  box-shadow: 2px 2px 3px #646464,
    -2px -2px 3px #c9c9c9;
  transition: box-shadow 0.3s, color 0.3s;
}

.breadcrumbs__item:not(:last-child) .breadcrumbs__button:after {
  content: '>';
  display: inline-block;
}

.breadcrumbs__item:last-child .breadcrumbs__button {
  pointer-events: none;
  box-shadow: none;
  font-weight: 700;
  position: relative;
}

.breadcrumbs__item:first-child .breadcrumbs__button {
  pointer-events: all;
}

.breadcrumbs__item:first-child .breadcrumbs__button:after {
  content: '>';
  display: inline-block;
}

.breadcrumbs__button:hover,
.breadcrumbs__button:focus {
  box-shadow: 4px 4px 7px #646464,
    -4px -4px 7px #c9c9c9;
}

.breadcrumbs__button:active {
  box-shadow: inset 2px 2px 3px #646464,
    inset -2px -2px 3px #c9c9c9;
}
</style>
