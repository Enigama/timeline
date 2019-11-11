<template>
	<div v-html="require(`images/inline-${icon}.svg`)"></div>
</template>

<script>  
export default {  
	props: ['icon']
}
</script>

