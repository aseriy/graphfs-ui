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
            <path id="Vector" d="M9 5L16 12L9 19" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        Identical Files ({{ data.identical?.length }}):
      </button>

      <div ref="identicalBody" class="file-analysis__body identical-body">
        <div v-for="(ident, i) in data.identical" :key='i'>
          <span>
            {{ i + 1 }}
          </span>
          <span @click="updatePath(ident)">{{ ident }}</span>
        </div>
      </div>


    </div>

    <div class="file-analysis__item similar">
      <button ref="similarButton" class="file-analysis__button similar-button" type="button" @click="toggleActive('similar')">
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Arrow / Chevron_Right">
            <path id="Vector" d="M9 5L16 12L9 19" stroke="#4A4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        Similar Files ({{ data.similar?.size }} in {{ data.similar?.nodes.length }} groups):
      </button>

      <div ref="similarBody" class="file-analysis__body similar-body">
        <div v-for="(node, i) in data.similar?.nodes" :key='i'>
          <span>{{ i + 1 }}</span>
          <span>
            <table width="100%">
              <tr v-for="(similar, j) in data.similar?.groups[node]" :key='j'>
                <td>{{ j + 1 }}</td>
                <td @click="updatePath(similar)">{{ similar }}</td>
              </tr>
            </table>
          </span>
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
  border: 1px solid #707070;
  border-radius: 4px;
  padding: 2px 8px;
}

.file-info__label {
  font-weight: 700;
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
  border: 1px solid #4A4A4A;
}

.file-analysis__button .icon {
  transition: transform 0.5s;
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
  border: 1px solid #4A4A4A;
  border-top: none;
}
</style>