<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';

	let {
		handleEdit,
		handleDelete,
		id
	}: { handleEdit: (id: string) => void; handleDelete: (id: string) => void; id: string } =
		$props();
</script>

<div
	class="absolute bottom-0 right-0 py-1 px-4 flex flex-row gap-2 justify-end opacity-0 transition-opacity group-hover/item:opacity-100 print:hidden"
>
	<Button variant="ghost" class="backdrop-blur-md" size="icon-sm" onclick={() => handleEdit(id)}>
		<Icon src={PencilSquare} class="size-3" />
	</Button>
	<Button
		variant="ghost"
		class="backdrop-blur-md hover:bg-destructive hover:text-destructive-foreground"
		size="icon-sm"
		onclick={() => handleDelete(id)}
	>
		<Icon src={Trash} class="size-3" />
	</Button>
</div>
