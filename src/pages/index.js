import './404';
import initHome from './home';
// import initExample from './example'; // need remove;

import Vue from 'vue';
import Timeline from './components/Timeline';

export default () => {
  console.log('init pages');
  initHome();
  // initExample();

  // new Vue({
  // 	el: '#timeline',
  //   render: createElem => createElem(Timeline),
  // })
};
