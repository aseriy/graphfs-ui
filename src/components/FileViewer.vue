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

  <div width="100%">
    <tr>
      <td width="50%">Identical Files ({{ data.identical?.length }})</td>
      <td width="50%">Similar Files ({{ data.similar?.size }} in {{ data.similar?.nodes.length }} groups)</td>
    </tr>
  </div>

  <div width="100%">
    <tr>
      <td colspan="2">Identical Files ({{ data.identical?.length }}):</td>
    </tr>
    <tr v-for="(ident, i) in data.identical" :key='i'>
      <td>{{ i+1 }}</td>
      <td @click="updatePath(ident)">{{ ident }}</td>
    </tr>
  </div>

  <div width="100%">
    <tr><td colspan="2">Similar Files ({{ data.similar?.size }} in {{ data.similar?.nodes.length }} groups):</td></tr>
    <tr v-for="(node, i) in data.similar?.nodes" :key='i'>
      <td>{{ i+1 }}</td>
      <td>
        <table width="100%">
          <tr v-for="(similar, j) in data.similar?.groups[node]" :key='j'>
            <td>{{ j+1 }}</td>
            <td @click="updatePath(similar)">{{ similar }}</td>
          </tr>
        </table>
      </td>
    </tr>
  </div>

</template>

<script>

export default {
  name: 'FileViewer',
  data() {
    return {
      data: {}
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
      Object.keys(groups).forEach( (grp) => {
        size += groups[grp].length
      })

      const data = {
        nodes: Object.keys(groups),
        groups: groups,
        size: size
      }
      return data
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
  margin-bottom: 15px;
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

</style>