<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Star } from '@steeze-ui/lucide-icons';

	let {
		class: className,
		rating
	}: {
		class?: string;
		rating: number;
	} = $props();
</script>

<div class={cn('flex gap-2', className)}>
	{#each Array(rating) as _}
		<Icon src={Star} class="size-4 fill-current" />
	{/each}
	{#each Array(Math.round(5 - rating)) as _}
		<Icon src={Star} class="size-4 fill-muted" />
	{/each}
</div>
