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

@font-face {
  font-family: "Source Code Pro Regular";
  src: url("/assets/fonts/TTF/SourceCodePro-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

$family-sans-serif: "Source Code Pro Regular", monospace;
$family-monospace: "Source Code Pro Regular", monospace;
$family-primary: "Source Code Pro Regular", monospace;
$body-family: "Source Code Pro Regular", monospace;

// @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,500,700');
// @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,500,700|Source+Sans+Pro');
// $family-sans-serif: 'Source Sans Pro', sans-serif;
// $family-monospace: 'Source Code Pro', monospace;
// $family-primary: 'Source Code Pro', monospace;
// $body-family:'Source Code Pro', monospace;
$primary: #989898;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Navbar
$navbar-height: 5rem; // default 3.25

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
