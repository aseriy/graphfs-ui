<template>
  <div class="stats panel__inner">
    <div class="panel__item shadow-box shadow-box--green">
      <div class="title-wrap">
        <h2 class="title">File system</h2>
      </div>


      <ul class="panel__list">
        <li class="panel__list-item">
          <span class="panel__list-caption">Directories:</span>
          <span class="panel__value">{{ stats.fs?.directories }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Files:</span>
          <span class="panel__value">{{ stats.fs?.files }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">File Nodes:</span>
          <span class="panel__value">{{ stats.fs?.filenodes }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Size:</span>
          <span class="panel__value">{{ stats.fs?.size }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Redundancy:</span>
          <span class="panel__value">{{ stats.fs?.redundancy }}</span>
        </li>
      </ul>
    </div>
    <div class="panel__item shadow-box shadow-box--green">
      <div class="title-wrap">
        <h2 class="title">Data store</h2>
      </div>
      <ul class="panel__list">
        <li class="panel__list-item">
          <span class="panel__list-caption">Containers:</span>
          <span class="panel__value">{{ stats.store?.containers }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Searched for Similarities:</span>
          <span class="panel__value">{{ stats.store?.simsearched }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Similarity Search Progress (%):</span>
          <span class="panel__value">{{ stats.store?.simsearch_progress }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Similar:</span>
          <span class="panel__value">{{ stats.store?.similar }}</span>
        </li>
        <li class="panel__list-item">
          <span class="panel__list-caption">Similarity (%):</span>
          <span class="panel__value">{{ stats.store?.similarity }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>



<script>
export default {
  name: 'Stats',
  props: {
    msg: String
  },
  data() {
    return {
      stats: {
        // fs: {
        //   directories: "",
        //   files: "",
        //   filenodes: "",
        //   size: "",
        //   redundancy: ""
        // },
        // store: {
        //   containers: "",
        //   simsearched: "",
        //   simsearch_progress: "",
        //   similar: "",
        //   similarity: ""
        // }
      }
    }
  },

  methods: {

    async getStats() {
      const res = await fetch('http://localhost:9000/apis/stats')
      const data = await res.json()
      console.log(data)
      return data
    }

  },

  async created() {
    this.stats = await this.getStats()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel__inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.panel__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel__item {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.panel__item:before {
  content: '';
  width: 100%;
  height: 85px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--grey);
  z-index: -1;
}

.panel__list-item {
  display: flex;
  gap: 10px;
}

.panel__list-caption {
  width: 73%;
  color: var(--green-400);
  font-size: 17px;
  font-weight: 500;
  text-align: right;
  text-transform: uppercase;
}

.panel__value {
  font-size: 18px;
  color: var(--dark);
  font-weight: 600;
  text-align: left;
  flex-grow: 1;
}
</style>
