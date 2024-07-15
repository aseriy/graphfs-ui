<template>
  <div class="wrapper">
    <h1 class="sr-only">GraphFS Application</h1>
    <div class="space">
      <div class="space__top">
        <img src="images/logo.svg" alt="GraphFS logo" class="logo" width="145" height="50">
      </div>

      <div class="space__inner">
        <div class="panel"><Stats/></div>
        <div class="browser shadow-box"><FileBrowser/></div>
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
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap');

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

#app {
  font-family: "Jura", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4A4A4A;
  font-size: 16px;
  line-height: 1.3;
  font-style: normal;
  font-weight: 400;
}

.shadow-box {
  padding: 30px;
  background-color: #EDEDED;
  box-shadow: inset 2px 2px 4px #9a9a9a,
              inset -2px -2px 4px #ffffff;
  border-radius: 10px;
}

.wrapper {
  padding: 45px;
  min-height: 100vh;
  background-color: #EDEDED;
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
}

.title {
  font-size: 32px;
  margin-bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
}
.title:before {
  content: '';
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
  flex-shrink: 0;
}
.title--blue:before {
  background: linear-gradient(90deg, rgba(29,128,221,1) 0%, rgba(23,78,130,1) 100%);
}
.title--green:before {
  background: linear-gradient(90deg, rgba(192,242,152,1) 0%, rgba(99,166,52,1) 100%);
}
.title--orange:before {
  background: linear-gradient(90deg, rgba(252,180,93,1) 0%, rgba(198,86,12,1) 100%);
}

</style>
