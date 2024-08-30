<template>
  <div class="wrapper">
    <h1 class="sr-only">GraphFS Application</h1>
    <div class="space">
      <div class="space__top">
        <img src="images/logo.svg" alt="GraphFS logo" class="logo" width="145" height="50">
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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Red+Hat+Mono:ital,wght@0,300..700;1,300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sometype+Mono:ital,wght@0,400..700;1,400..700&display=swap');

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
  --dark: #181818;
  --light: #fcfcfc;
  --green-100: #c8d7c8;
  --green-300: #bbff9e;
  --green-400: #007B3C;
  --grey: #9a9a9a;
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

#app {
  font-family: "Cousine", monospace;
  /* font-family: "Red Hat Mono", monospace; */
  font-family: "Sometype Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  font-size: 16px;
  line-height: 1.3;
  font-style: normal;
  font-weight: 500;
}

.shadow-box {
  padding: 26px;
  background-color: var(--light);

  box-shadow: inset 2px 2px 4px var(--grey),
              inset -2px -2px 4px #ffffff2d;
  border-radius: 10px;
}

.shadow-box--green {

}

.wrapper {
  padding: 45px;
  min-height: 100vh;
  background-color: var(--green-100);

}

.space__top {
  margin-bottom: 30px;
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
