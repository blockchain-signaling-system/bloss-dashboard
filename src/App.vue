<template>
  <div id="app">
   <!-- Old html below -->
        <div id="nav">
          <router-link to="/">Home</router-link>|
          <router-link to="/about">About</router-link>
        </div>
    <router-view/> 
  </div>
</template>

<style lang="scss">
@import "./style/style";

@import '~bulma/sass/utilities/all';
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,500,700');
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,500,700|Source+Sans+Pro');
$family-sans-serif: 'Source Sans Pro', sans-serif;
$family-monospace: 'Source Code Pro', monospace;
$family-primary: 'Source Code Pro', monospace;
$body-family:'Source Code Pro', monospace;
$primary: #989898;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Navbar
$navbar-height: 5rem; // default 3.25

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
// Import Bulma and Buefy styles
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";
// @import "../node_modules/bulma/sass/utilities/_all.sass";
// @import "../node_modules/bulma/";
// @import "../node_modules/buefy/src/scss/buefy";

// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 5px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

// Import Bulma's core
</style>
