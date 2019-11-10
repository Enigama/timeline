import 'core-js/es/promise';

import $ from 'jquery';

import Vue from 'vue';
import Timeline from './pages/components/Timeline';

// Uncomment for use BOOTSTAP4
// window.Popper = require('popper.js').default;
// require('bootstrap');
// import 'bootstrap/scss/bootstrap.scss';

import './fonts';
import initLayout from './layout';
import initBlocks from './blocks';
import initPages from './pages';

$(() => {
  initLayout();
  initBlocks();
  initPages();
});

Vue.component('time-line', Timeline);
const app = new Vue({
	el:'#app'
});