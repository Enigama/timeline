<template>
  <div class="timeline">
    <div class="timeline__time">
        <div class="timeline__number timeline__number--day">{{day}}</div>
        <div class="timeline__desc">{{textDays}}</div>
    </div>
    <div class="timeline__time">
        <div class="timeline__number timeline__number--hour">{{hour}}</div>
        <div class="timeline__desc">{{textHours}}</div>
    </div>
    <div class="timeline__time">
        <div class="timeline__number timeline__number--minutes">{{minute}}</div>
        <div class="timeline__desc">{{textMinutes}}</div>
    </div>
  	<svg-inline
  		class="timeline__icon timeline__icon--info timeline__icon--timeline"
			icon="information"
			:content=tippyContent
			v-tippy="{...tippySettings}"
		>    	
		</svg-inline>
</div>
</template>

<script>
	import 'tippy.js/themes/light.css';
	import svgInline from './svg-inline';
  export default {
  	component:{
  		svgInline
  	},
  	props: [
  		'tippyContent',
  		'finish',
  		'days',
  		'hours',
  		'minutes',
  		'seconds',
		],
    data(){
    	return{
    		time: new Date(this.finish * 1000),

    		day: 0,
    		hour: 0,
    		minute: 0,
    		sec: 0,

    		textDays: '',
    		textHours: '',
    		textMinutes: '',
    		textSeconds: '',

    		tippySettings: {
    			placement : 'top',
    			arrow: true,
    			theme: 'light',
    		},
    	}
    },
    mounted(){
    	this.initTimer();
    },
    methods: {
    	createArrText(text){
    		return text.split(',')
    	},
    	initTimer(){
    		this.updateTimer()
    		const timeinterval = setInterval(this.updateTimer, 1000);
    	},
    	getTimeRemaining(){
    		const t = Date.parse(this.time) - Date.parse(new Date());
		    const seconds = Math.floor((t / 1000) % 60);
		    const minutes = Math.floor((t / 1000 / 60) % 60);
		    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		    const days = Math.floor(t / (1000 * 60 * 60 * 24));

		    return {
		      'total': t,
		      'days': days,
		      'hours': hours,
		      'minutes': minutes,
		      'seconds': seconds
		    };
    	},
    	updateTimer(){
    		const t = this.getTimeRemaining();
    		const days = t.days;
    		const hours = ('0' + t.hours).slice(-2);
    		const minutes = ('0' + t.minutes).slice(-2);
    		const seconds = ('0' + t.seconds).slice(-2)

    		this.day = days;
    		this.hour = hours;
    		this.minute = minutes;
    		this.second = seconds;

    		this.textDays = this.pluralize(days, this.createArrText(this.days))
    		this.textHours = this.pluralize(hours, this.createArrText(this.hours))
    		this.textMinutes = this.pluralize(minutes, this.createArrText(this.minutes))	      
	      
	      if (t.total <= 0) {
	        clearInterval(timeinterval);
	      }
    	},

    	pluralize(number, type){
    		let n = Math.abs(number);
	      n %= 100;
	      if (n >= 5 && n <= 20) {
	        return type[2];
	      }
	      n %= 10;
	      if (n === 1) {
	        return type[0];
	      }
	      if (n >= 2 && n <= 4) {
	        return type[1];
	      }
	      return type[2];
    	}
    }
  };
</script>

<style lang="sass">
	.timeline
	  display: flex
	  align-items: center
	  color: #121212

	.timeline__time
	  display: flex
	  flex-direction: column
	  justify-content: center
	  align-items: center
	  width: 40px
	  height: 46px
	  border-radius: 8px
	  background-color: #fff

	  & + &
	    margin-left: 8px

	  +min-w(360)
	    width: 40px
	    height: 46px

	  +min-w(768)
	    width: 56px
	    height: 64px

	.timeline__number
	  font-size: 16px
	  line-height: 1

	  +min-w(360)
	    font-size: 16px

	  +min-w(768)
	    font-size: 24px

	.timeline__desc
	  font-size: 8px
	  line-height: 1

	  +min-w(360)
	    font-size: 8px

	  +min-w(768)
	    font-size: 10px

	.timeline__icon
	  margin-left: 8px

	  svg
	    width: 100%
	    height: 100%

	  &--timeline
	    display: block

	    +min-w(360)
	      display: block

	    +min-w(480)
	      display: none

	  &--info
	    width: 16px
	    height: 16px

	.timeline__tippy-theme
	  .tippy-content
	    padding: 24px

	    p
	      margin-bottom: 10px

	//TODO this place to modifire from other components
	.timeline--sm
	  .timeline__icon--timeline
	    display: block

	  .timeline__time
	    width: 40px
	    height: 46px

	  .timeline__number
	    font-size: 16px

	  .timeline__desc
	    font-size: 8px


	.timeline--entry
	  .timeline__time:not(:first-child)
	    +min-w(991)
	      margin-left: 16px

	//.timeline--fcp
	//  .timeline__icon--timeline
	//    +min-w($mobile-sm)
	//      display: block

	.timeline--freshcatch
</style>
