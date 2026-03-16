<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Plus, Trash } from '@steeze-ui/heroicons';
	import { Button } from '$lib/components/ui/button';

	let {
		title,
		addSection = null,
		editSection = null,
		removeSection = null
	}: {
		title: string;
		addSection?: (() => void) | null;
		editSection?: (() => void) | null;
		removeSection?: (() => void) | null;
	} = $props();
</script>

<div class="mb-4 flex items-center justify-between pb-2">
	<h2 class="text-lg font-semibold text-foreground">{title}</h2>
	<div class="flex gap-2 group-hover:opacity-100 opacity-0">
		{#if editSection}
			<Button variant="ghost" size="icon" onclick={editSection} title="Muokkaa">
				<Icon src={PencilSquare} class="h-5 w-5" />
			</Button>
		{/if}
		{#if addSection}
			<Button variant="outline" size="sm" onclick={addSection} class="flex items-center gap-1">
				<Icon src={Plus} class="h-4 w-4" />
				Lisää
			</Button>
		{/if}
		{#if removeSection}
			<Button variant="outline" size="sm" onclick={removeSection} class="flex items-center gap-1">
				<Icon src={Trash} class="h-4 w-4" />
				Poista osio
			</Button>
		{/if}
	</div>
</div>
