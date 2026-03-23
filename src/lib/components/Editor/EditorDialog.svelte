<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		title,
		description,
		handleSave,
		children
	}: {
		open: boolean;
		title: string;
		description?: string;
		handleSave: () => void;
		children: Snippet;
	} = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			{#if description}
				<Dialog.Description>{description}</Dialog.Description>
			{/if}
		</Dialog.Header>

		<div class="py-4 grow">
			<div class="grid gap-4">
				{@render children()}
			</div>
		</div>

		<Dialog.Footer>
			<Button variant="outline" onclick={() => (open = false)}>Peruuta</Button>
			<Button type="submit" onclick={handleSave}>Tallenna</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
