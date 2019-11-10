<template>
  <div class="timeline">
    <div class="timeline__time">
        <div class="timeline__number timeline__number--day">{{days}}</div>
        <div class="timeline__desc">{{textDays}}</div>
    </div>
    <div class="timeline__time">
        <div class="timeline__number timeline__number--hour">{{hours}}</div>
        <div class="timeline__desc">{{textHours}}</div>
    </div>
    <div class="timeline__time">
        <div class="timeline__number timeline__number--minutes">{{minutes}}</div>
        <div class="timeline__desc">{{textMinutes}}</div>
    </div>
    <div class="timeline__icon timeline__icon--info timeline__icon--timeline"
         data-content="test3">
        @svg('static/icons/information.svg')
    </div>
</div>
</template>

<script>
  export default {
    data(){
    	return{
    		time: '',

    		days: 0,
    		hours: 0,
    		minutes: 0,
    		seconds: 0,

    		textDays: '',
    		textHours: '',
    		textMinutes: '',
    		textSeconds: '',

    		arrDeys: [],
    		arrHours: [],
    		arrMinutes: [],
    		arrSeconds: [],
    	}
    },
    mounted(){
			this.time = new Date(this.$attrs["finish"] * 1000);
			this.arrDays = this.$attrs["days"].split(',')
			this.arrHours = this.$attrs["hours"].split(',')
			this.arrMinutes = this.$attrs["minutes"].split(',')
			this.arrSeconds = this.$attrs["seconds"].split(',')
    	this.initTimer();
    	console.log(this)
    },
    methods: {
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

    		this.days = days;
    		this.hours = hours;
    		this.minutes = minutes;
    		this.seconds = seconds;

    		this.textDays = this.pluralize(days, this.arrDays)
    		this.textHours = this.pluralize(hours, this.arrHours)
    		this.textMinutes = this.pluralize(minutes, this.arrMinutes)	      
	      
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
