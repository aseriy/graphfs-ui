<template>
  <div class="wrapper" :class="{ dark: isDarkMode }">
    <h1 class="sr-only">GraphFS Application</h1>
    <div class="space">
      <div class="space__top">
        <img src="/images/logo.svg" alt="GraphFS logo" class="logo" width="145" height="50">
        <img src="/images/logo-light.svg" alt="GraphFS logo" class="logo-light" width="145" height="50">
        <button class="theme-btn" type="button" @click="toggleTheme"></button>
      </div>

      <div class="space__inner">
        <div class="panel"><Stats/></div>
        <div class="browser shadow-box shadow-box--green"><FileBrowser/></div>
      </div>

    </div>

  </div>
</template>

<script>
import Stats from './components/Stats.vue'
import FileBrowser from './components/FileBrowser.vue'

export default {
  name: 'GraphFS',
  components: {
    Stats,
    FileBrowser
  },
    data() {
      return {
        isDarkMode: false
      };
    },
    methods: {
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
      }
    }
}
</script>



<style>

@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,300..700;1,300..700&display=swap');
html, body, div, span, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, address, cite, img, ol, ul, li, fieldset, form, label, legend, article, aside, footer, header, menu, nav, section {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
  box-sizing: border-box;
	height: 100%;
}
*,
*::before,
*::after {
    box-sizing: inherit;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
a {
  display: inline-block;
  text-decoration: none;
	outline: transparent;
  color: inherit;
}
img {
	display: block;
	max-width: 100%;
}
input, button, textarea, select {
	font: inherit;
	border: none;
  outline: transparent;
}
button {
	padding: 0;
	background-color: transparent;
	cursor: pointer;
	color: inherit;
}

:root {
  --dark: #252525;
  --light: #fcfcfc;
  --green-100: #c8d7c8;
  --green-300: #7fb368;
  --green-400: #007B3C;
  --border-grey: #9f9f9f4b;
  --grey: #6f6f6f;
  --grey-600: #808080;
  --grey-800: #363636;

  --green-300-static: #9adb7e;
}

:root .wrapper.dark {
  --green-400: #1d9255;
  --green-300: #9adb7e;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
}
.none {
  display: none!important;
}

#app {}

.shadow-box {
  padding: 26px;
  background-color: var(--light);

  /* box-shadow: inset 2px 2px 4px var(--grey),
              inset -2px -2px 4px #ffffff2d; */
  border-radius: 10px;
}

.wrapper {
  font-family: "Red Hat Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  font-size: 16px;
  line-height: 1.3;
  font-style: normal;
  font-weight: 400;


  padding: 45px;
  min-height: 100vh;
  background-color: var(--green-100);
}

.wrapper.dark {
  background-color: var(--grey-600);
  color: var(--light);
}
.logo-light {
  display: none;
}

.wrapper.dark .logo {
  display: none;
}
.wrapper.dark .logo-light {
  display: block;
}
.wrapper.dark .theme-btn {
  background-color: var(--grey-800);
  box-shadow: inset 2px 2px 4px #000000,
  inset -2px -2px 4px #616161;
  justify-content: flex-end;
}
.wrapper.dark .theme-btn:before {
  background-color: var(--green-100);
}
/* серые шапки */
.wrapper.dark .browser:before, .wrapper.dark .panel__item:before {
  background-color: var(--grey-800);
}
.wrapper.dark .shadow-box {
  background-color: var(--dark);
  /* box-shadow: inset 2px 2px 4px #000000,
  inset -2px -2px 4px #4e4e4e; */
}
.wrapper.dark .panel__value {
  color: var(--light);
}
.wrapper.dark .breadcrumbs__button {
  background-color: var(--grey-800);
  /* box-shadow: 2px 2px 3px #000000,
  -2px -2px 3px #5a5a5a; */
  font-weight: 400;
}
.wrapper.dark .breadcrumbs__item:last-child .breadcrumbs__button {
  font-weight: 500;
}
/* .wrapper.dark .breadcrumbs__button:hover, .wrapper.dark .breadcrumbs__button:focus {
  box-shadow: 4px 4px 7px #000000,
  -4px -4px 7px #5a5a5a;
}
.wrapper.dark .breadcrumbs__button:active {
  box-shadow: inset 2px 2px 3px #000000,
  inset -2px -2px 3px #5a5a5a;
}
.wrapper.dark .directories__button {
  box-shadow: 2px 2px 4px #000000,
              -2px -2px 4px #4e4e4e;
}
.wrapper.dark .directories__button:active {
  box-shadow: inset 2px 2px 4px #000000,
              inset -2px -2px 4px #4e4e4e;
} */
.wrapper.dark {

}





.space__top {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.theme-btn {
  width: 80px;
  height: 50px;
  background-color: var(--green-100);
  border-radius: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 7px;
  box-shadow: inset 2px 2px 4px #939e93,
              inset -2px -2px 4px #e4f5e4;
}

.theme-btn:before {
  content: '';
  display: block;
  width: 36px;
  height: 36px;
  background-color: var(--light);
  border-radius: 50%;
}

.space__inner {
  display: flex;
  gap: 40px;
}

.panel {
  max-width: 490px;
  width: 100%;
}

.browser {
  flex-grow: 1;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.browser:before {
  content: '';
  width: 100%;
  height: 120px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--grey);
  z-index: -1;
}

.title {
  font-size: 32px;
  margin-bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1;
  color: #fff;
}
.title:before {
  content: '';
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(90deg, rgba(192,242,152,1) 0%, rgba(99,166,52,1) 100%);
  z-index: 0;
}


.ruller {
  display: block;
  width: 50px;
  height: 50px;
  background-color: tomato;
}

</style>
