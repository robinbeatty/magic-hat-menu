<script setup lang="ts">
import '~/assets/css/main.css'

//import { getStorage } from 'assets/common/lib/storage'
//const storage = useSessionStorage('arcticface', null)

const config = useRuntimeConfig()
if ( !config.indexable ) {
	console.warn('Site is set to not be indexed by search engines (.env.indexable=false)')
}
const route = useRoute()
const dark = computed(() => route.query['dark'] == 'true')

</script>

<template>
	<div class="bg-colour-1" :class="dark && 'invert'">
		<NuxtLayout>
			<div>
				<NuxtPage />
			</div>
		</NuxtLayout>
	</div>
</template>
