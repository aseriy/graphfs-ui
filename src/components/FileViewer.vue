<template>
  <table width="100%">
    <tr>
      <td>Name:</td>
      <td>{{ $parent.data.basename }}</td>
      <td>Size:</td>
      <td>{{ $parent.data.size }}</td>
      <td>MIME Type:</td>
      <td>{{ $parent.data.mime }}</td>
    </tr>
  </table>

  <table width="100%">
    <tr>
      <td width="50%">Identical Files ({{ data.identical?.length }})</td>
      <td width="50%">Similar Files ({{ data.similar?.size }} in {{ data.similar?.nodes.length }} groups)</td>
    </tr>
  </table>

  <table width="100%">
    <tr><td colspan="2">Identical Files ({{ data.identical?.length }}):</td></tr>
    <tr v-for="(ident, i) in data.identical" :key='i'>
      <td>{{ i+1 }}</td>
      <td @click="updatePath(ident)">{{ ident }}</td>
    </tr>
  </table>

  <table width="100%">
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
  </table>

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
  vertical-align: top;
}
</style>