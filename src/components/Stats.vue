<template>
  <div class="stats">
      <h1>FILE SYSTEM</h1>
      <table width="100%">
        <tr>
          <td width="60%">Directories</td><td>{{ stats.fs?.directories }}</td>
        </tr>
        <tr>
          <td>Files</td><td>{{  stats.fs?.files }}</td>
        </tr>
        <tr>
          <td>File Nodes</td><td>{{ stats.fs?.filenodes }}</td>
        </tr>
        <tr>
          <td>Size</td><td>{{ stats.fs?.size }}</td>
        </tr>
        <tr>
          <td>Redundancy</td><td>{{ stats.fs?.redundancy }}</td>
        </tr>
      </table>
      <h1>DATA STORE</h1>
      <table width="100%">
        <tr>
          <td width="60%">Containers</td><td>{{ stats.store?.containers }}</td>
        </tr>
        <tr>
          <td>Searched for Similarities</td><td>{{  stats.store?.simsearched }}</td>
        </tr>
        <tr>
          <td>Similarity Search Progress (%)</td><td>{{  stats.store?.simsearch_progress }}</td>
        </tr>
        <tr>
          <td>Similar</td><td>{{ stats.store?.similar }}</td>
        </tr>
        <tr>
          <td>Similarity (%)</td><td>{{ stats.store?.similarity }}</td>
        </tr>
      </table>
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
      const res = await fetch('/apis/stats')
      const data = await res.json()
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
  text-align: right;
}
</style>
