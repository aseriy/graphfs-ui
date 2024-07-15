<template>

  <div width="100%" class="directories">
    <span class="directories__total">Total: {{ $parent.data.size }}</span>

    <div class="directories__inner">
      <div class="directories__header">
        <span class="directories__type">Type</span>
        <span class="directories__name">Name</span>
        <span class="directories__size">Size</span>
      </div>

      <div class="directories__body">
        <div class="directories__item" v-for="(child, key) in $parent.data.children" :key='key'>
          <span class="directories__type-value">{{ child.type }}</span>
          <span class="directories__name-value">
            <button type="button" class="directories__button" @click="$parent.updatePath($parent.data.path + '/' + child.basename)">{{ child.basename }}</button>
          </span>
          <span class="directories__size-value">{{ child.size }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'DirectoryListing',
  data() {
    return {
      data: {}
    }
  },

  async created() {
  }

}

</script>

<style scoped>
.directories {}

.directories__total {
  display: block;
  margin-bottom: 15px;
}

.directories__inner {
  border-left: 1px solid #9a9a9a;
  padding: 10px;
}

.directories__header {
  display: flex;
  font-weight: 700;
  margin-bottom: 10px;
}

.directories__body {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.directories__item {
  display: flex;
}

.directories__type,
.directories__type-value {
  max-width: 150px;
  width: 100%;
}

.directories__name,
.directories__name-value {
  flex-grow: 1;
}

.directories__size,
.directories__size-value {
  max-width: 250px;
  width: 100%;
}

.directories__button {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  padding: 2px 8px;
  box-shadow: 2px 2px 4px #9a9a9a,
  -2px -2px 4px #ffffff;
  transition: box-shadow 0.3s, color 0.3s;
}

.directories__button:hover {
    color: #D05A00;
}

.directories__button:active {
  box-shadow: inset 2px 2px 4px #9a9a9a,
    inset -2px -2px 4px #ffffff;
}
</style>