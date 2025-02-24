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

          <div v-if="child.type === 'Directory'">
            <span class="directories__type-value">
              <svg class="icon icon-directory" width="24" height="24">
                <use href="/images/sprite.svg#icon-directory"></use>
              </svg>

            </span>
          </div>

          <div v-else>
            <span class="directories__type-value">
              <svg class="icon icon-file" width="24" height="24">
                <use href="/images/sprite.svg#icon-file"></use>
              </svg>
            </span>
          </div>

          <span class="directories__name-value">
            <button type="button" class="directories__button" @click="$parent.updatePath($parent.data.path + '/' + child.basename)">
              {{ child.basename }}
            </button>
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
  },

}

</script>

<style scoped>


.directories .icon {
  fill: var(--green-400);
}

.directories__total {
  display: block;
  margin-bottom: 15px;
  color: var(--green-400);
  text-transform: uppercase;
}

.directories__inner {
  border-left: 1px solid #9a9a9a;

}

.directories__header {
  display: flex;
  font-weight: 500;
  margin-bottom: 10px;
  color: var(--light);
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
  padding: 10px;
}

.directories__header:before {
  content: '';
  position: absolute;
  z-index: -1;
  background-color: var(--grey);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

}

.directories__body {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 10px 10px 10px 30px;
}

.directories__item {
  display: flex;
  align-items: center;
  gap: 15px;
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
  border: 1px solid var(--border-grey);
  transition: border-color 0.3s, color 0.3s;
}

.directories__button:hover,
.directories__button:focus {
  color: var(--green-300);
}

.directories__button:active {
  border-color: var(--green-300);
}
</style>