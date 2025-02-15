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


              <svg class="icon icon-home" width="24" height="24">
                <use href="images/sprite.svg#icon-home"></use>
              </svg>


              <!-- <svg class="icon icon-home" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 10.5256L10.4993 3.49031C11.382 2.83656 12.618 2.83656 13.5007 3.49031L23 10.5256M4.66667 8.19795V18.6724C4.66667 19.9579 5.76108 21 7.11111 21H16.8889C18.2389 21 19.3333 19.9579 19.3333 18.6724V8.19795" stroke-width="2" stroke-linecap="round"/>
              </svg>
              -->

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
  border: 1px solid var(--border-grey);
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
  align-items: center;
  gap: 15px;
}

.breadcrumbs__button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--grey);
  border-radius: 4px;
  padding: 3px 8px;
  color: var(--green-300-static);
  border: 1px solid var(--border-grey);
  transition: border-color 0.3s, color 0.3s;
}

.icon-home {
  stroke: var(--green-300-static);
  fill: transparent;
}

.breadcrumbs__item:not(:last-child) .breadcrumbs__button:after {
  content: '>';
  display: inline-block;
}

.breadcrumbs__item:last-child .breadcrumbs__button {
  pointer-events: none;
  box-shadow: none;
  font-weight: 500;
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
  border-color: var(--green-300-static);
}

.breadcrumbs__button:active {
  box-shadow: inset 2px 2px 3px #646464,
    inset -2px -2px 3px #c9c9c9;
}
</style>
