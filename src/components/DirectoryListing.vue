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
              <svg class="file" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.438 5.08898C21.2896 5.0111 21.1241 4.97166 20.9566 4.97428C20.789 4.9769 20.6248 5.0215 20.479 5.10398C19.795 5.49298 19.124 5.68098 18.426 5.68098C16.391 5.68098 14.474 4.05198 12.704 2.29098C12.329 1.91798 11.641 1.91798 11.266 2.29098C9.59198 3.95898 7.59798 5.66298 5.50998 5.66298C4.81998 5.66298 4.15898 5.47898 3.49198 5.10198C3.19398 4.93598 2.83398 4.93098 2.53198 5.08998C2.22998 5.24898 2.03098 5.55098 2.00398 5.89098C1.99298 6.01998 1.05998 18.763 11.687 21.932C11.7797 21.9599 11.8761 21.9741 11.973 21.974H12C12.097 21.974 12.192 21.96 12.285 21.933C22.942 18.763 21.98 6.01698 21.969 5.88898C21.9547 5.72179 21.8986 5.56088 21.8058 5.42108C21.713 5.28128 21.5865 5.16707 21.438 5.08898ZM11.986 19.931C5.00698 17.676 4.05198 10.519 3.97198 7.45398C4.47698 7.59398 4.99098 7.66298 5.50898 7.66298C8.00098 7.66298 10.159 6.09598 11.985 4.37998C13.878 6.16798 15.968 7.68098 18.427 7.68098C18.957 7.68098 19.484 7.60698 20.002 7.46098C19.928 10.526 18.981 17.678 11.986 19.931Z"
                  fill="black" />
              </svg>
            </span>
          </div>

          <div v-else>
            <span class="directories__type-value">
              <svg class="directory" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V4C20 2.897 19.103 2 18 2H6ZM6 17V5H18L18.002 17H6Z" fill="black" />
              </svg>
            </span>
          </div>




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
  color: var(--green-400);
  text-transform: uppercase;
}

.directories__inner {
  border-left: 1px solid #9a9a9a;
  padding: 10px;
}

.directories__header {
  display: flex;
  font-weight: 500;
  margin-bottom: 10px;
  color: var(--light);
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
}

.directories__header:before {
  content: '';
  position: absolute;
  z-index: -1;
  background-color: var(--grey);
  width: calc(100% + 15px);
  height: calc(100% + 19px);
  left: -10px;
  top: -10px;

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

.directories__button:hover,
.directories__button:focus {
  color: #D05A00;
}

.directories__button:active {
  box-shadow: inset 2px 2px 4px #9a9a9a,
    inset -2px -2px 4px #ffffff;
}
</style>