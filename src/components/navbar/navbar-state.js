// Most mobile devices are less than 500px in width
export const togglecollapse = function() { if (window.innerWidth <= 500) { this.$root.$emit('bv::toggle::collapse', 'collapsed-id') } }
