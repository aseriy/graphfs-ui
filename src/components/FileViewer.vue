<template>


  <div class="file-info">
    <div class="file-info__item">
      <span class="file-info__label">Name:</span>
      <span class="file-info__value">{{ $parent.data.basename }}</span>
    </div>
    <div class="file-info__item">
      <span class="file-info__label">Size:</span>
      <span class="file-info__value">{{ $parent.data.size }}</span>
    </div>
    <div class="file-info__item">
      <span class="file-info__label">MIME Type:</span>
      <span class="file-info__value">{{ $parent.data.mime }}</span>
    </div>
  </div>

  <div class="file-analysis">


    <div class="file-analysis__item identical">
      <button ref="identicalButton" class="file-analysis__button identical-button" type="button" @click="toggleActive('identical')">
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Arrow / Chevron_Right">
            <path id="Vector" d="M9 5L16 12L9 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        Identical Files ({{ data.identical?.length }}):
      </button>

      <div ref="identicalBody" class="file-analysis__body identical-body">
        <ul class="identical-body__list">
          <li class="identical-body__item" v-for="(ident, i) in data.identical" :key='i'>
            <span class="file-analysis__num">
              {{ i + 1 }}
            </span>
            <span class="file-analysis__path" @click="updatePath(ident)">{{ ident }}</span>
          </li>
        </ul>
      </div>


    </div>

    <div class="file-analysis__item similar">
      <button ref="similarButton" class="file-analysis__button similar-button" type="button" @click="toggleActive('similar')">
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Arrow / Chevron_Right">
            <path id="Vector" d="M9 5L16 12L9 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        Similar Files ({{ data.similar?.size }} in {{ data.similar?.nodes.length }} groups):
      </button>

      <div ref="similarBody" class="file-analysis__body similar-body">

        <div class="similar-body__group" v-for="(node, i) in data.similar?.nodes" :key='i'>
          <span class="similar-body__title">
            {{ i + 1 }}
            group
          </span>

          <ul class="similar-body__list">
            <li class="similar-body__item" v-for="(similar, j) in data.similar?.groups[node]" :key='j'>
              <span class="file-analysis__num">
                {{ j + 1 }}
              </span>
              <span class="file-analysis__path" @click="updatePath(similar)">{{ similar }}</span>
            </li>
          </ul>
        </div>



      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'FileViewer',
  data() {
    return {
      data: {},
      currentType: null // for watching
    }
  },

  methods: {

    async updatePath(path) {
      await this.$parent.updatePath(path)
      this.data.identical = await this.getIdenticalFiles(path)
      this.data.similar = await this.getSimilarFiles(path)
    },

    async getIdenticalFiles(path) {
      const res = await fetch('/apis/identical' + path)
      const data = await res.json()
      return data
    },

    async getSimilarFiles(path) {
      const res = await fetch('/apis/similar' + path)
      const groups = await res.json()

      var size = 0
      Object.keys(groups).forEach((grp) => {
        size += groups[grp].length
      })

      const data = {
        nodes: Object.keys(groups),
        groups: groups,
        size: size
      }
      return data
    },



    // watching, when data come in - toggleActive is active.
    toggleActive(type) {
      const identicalButton = this.$refs.identicalButton;
      const identicalBody = this.$refs.identicalBody;
      const similarButton = this.$refs.similarButton;
      const similarBody = this.$refs.similarBody;

      if (type === 'identical') {
        identicalButton.classList.toggle('active');
        identicalBody.classList.toggle('active');
        similarButton.classList.remove('active');
        similarBody.classList.remove('active');
        this.currentType = 'identical';
      } else if (type === 'similar') {
        similarButton.classList.toggle('active');
        similarBody.classList.toggle('active');
        identicalButton.classList.remove('active');
        identicalBody.classList.remove('active');
        this.currentType = 'similar';
      }
    },

    startObserving() {
      this.observer = new MutationObserver(() => {
        this.toggleActive(this.currentType);
      });

      const config = { childList: true, subtree: true };
      this.observer.observe(this.$el, config);
    }



  },



  mounted() {
    this.startObserving();
  },

  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },






  async created() {
    this.data.identical = await this.getIdenticalFiles(this.$parent.data.path)
    this.data.similar = await this.getSimilarFiles(this.$parent.data.path)
    console.log("FileViewer / created(): ", this.data)
  }

}



</script>

<style scoped>
.file-info {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
}

.file-info__item {
  width: 28%;
  border-left: 3px solid var(--green-400);
  border-radius: 3px;
  padding: 2px 8px;
}

.file-info__label {
  font-weight: 600;
  display: inline-block;
  margin-right: 5px;
}

.file-analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.file-analysis__button {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid var(--border-grey);
  transition: color 0.3s, opacity 0.3s;
}

.file-analysis__button:hover,
.file-analysis__button:focus {
  color: var(--green-300);
}

.file-analysis__button:hover .icon,
.file-analysis__button:focus .icon {
  stroke: var(--green-300);
}

.file-analysis__button:active {
  opacity: 0.8;
}

.file-analysis__button .icon {
  stroke: var(--grey);
  transition: transform 0.3s, stroke 0.3s;
}

.file-analysis__button.active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
}

.file-analysis__button.active .icon {
  transform: rotate(90deg);
}

.file-analysis__body {
  height: 0;
  max-height: 0;
  overflow: hidden;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: height 1s, max-height 1s;
}

.file-analysis__body.active {
  height: auto;
  max-height: 10000px;
  padding: 15px;
  border: 2px solid var(--border-grey);
  border-top: none;
}

.file-analysis__num {
  display: inline-block;
  margin-right: 15px;
  width: 42px;
  text-align: right;
  padding-right: 6px;
  border-right: 1px solid var(--grey);
}

.identical-body__list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.similar-body {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.similar-body__list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.similar-body__title {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  color: var(--green-400);
  position: relative;
  z-index: 1;
}
.similar-body__title:before {
  content: '';
  position: absolute;
  background-color: var(--grey-800);
  width: calc(100% + 30px);
  height: calc(100% + 10px);
  left: -15px;
  top: -5px;
  z-index: -1;

}
</style>