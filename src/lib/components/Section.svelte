<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const sectionVariants = tv({
		base: '',
		variants: {
			layout: {
				default: 'flex flex-col gap-4',
				grid: 'grid grid-cols-2 gap-4',
				gridCols4: 'grid grid-cols-4 gap-4'
			}
		},
		defaultVariants: {
			layout: 'default'
		}
	});

	export type SectionContent = VariantProps<typeof sectionVariants>['layout'];
</script>

<!-- svelte-ignore state_referenced_locally -->
<script lang="ts" generics="K extends SectionKeyType">
	import { useState } from '$lib/stores/cv-store.svelte';
	import { EditorButtons, EditorDialog } from '$lib/components/Editor';
	import { type SectionKeyType, type CVMap } from '$lib/types/cv';
	import type { Snippet } from 'svelte';
	import { Button } from './ui/button';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Plus, Trash } from '@steeze-ui/heroicons';
	import { trackPrint } from '$lib/utils/documentState.svelte';

	interface Props {
		key: K;
		title?: string | null;
		multiple?: boolean;
		optional?: boolean;
		layout?: SectionContent;
		header?: Snippet | null;
		content: Snippet<
			[
				{
					item: CVMap[K];
					handleEdit: (id: string) => void;
					handleDelete: (id: string) => void;
				}
			]
		>;
		initializeEditor: () => CVMap[K];
		editor: Snippet<
			[
				{
					editData: CVMap[K];
					handleSave: () => void;
				}
			]
		>;
		class?: string;
	}

	const {
		title = null,
		key,
		multiple = false,
		optional = false,
		layout = 'default',
		header = null,
		content,
		editor,
		initializeEditor,
		class: className = ''
	}: Props = $props();

	const { data, getItem, addItem, setItem, removeItem, updateSection } = useState(key);

	const section = $derived.by(() => data[key]);

	let open = $state(false);
	let isEditing = $state(false);

	let editData: CVMap[K] = $state(initializeEditor());

	function handleDisable() {
		updateSection(key, { visible: false });
	}

	function handleAdd() {
		isEditing = false;
		editData = initializeEditor();
		open = true;
	}

	function handleEdit(id: string) {
		isEditing = true;
		editData = { ...((getItem(id) as CVMap[K]) ?? initializeEditor()) };
		open = true;
	}

	function handleDelete(id: string) {
		if (confirm('Haluatko varmasti poistaa tämän tutkinnon?')) {
			removeItem(id);
		}
	}

	function handleSave() {
		console.log(editData);
		if (isEditing) {
			setItem(editData.id, editData);
		} else {
			addItem(editData);
		}

		open = false;
	}
</script>

<div
	id={key + 'Parent'}
	class={cn(
		'group relative',
		{
			'print:hidden': section?.content.length === 0
		},
		className
	)}
>
	{#if header}
		{@render header()}
	{/if}

	{#if section && section.content.length > 0}
		<div class={cn(sectionVariants({ layout }))}>
			{#each section.content as item, index (item.id)}
				<div use:trackPrint={index === 0 ? key + 'Parent' : null} class={'group/item relative'}>
					{@render content({ item, handleEdit, handleDelete })}

					{#if multiple}
						<EditorButtons {handleEdit} {handleDelete} id={item.id} />
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex items-center gap-2 w-full justify-between">
			<p class="text-sm text-muted-foreground italic">
				Lisää {String(title || 'kohteita').toLowerCase()}
			</p>
			<Button variant="ghost" class="" onclick={() => handleAdd()}>
				<Icon src={Plus} class="size-4" />
			</Button>
		</div>
	{/if}

	<div
		class="absolute top-0 right-2 flex gap-2 group-hover:opacity-100 md:opacity-0 transition-opacity"
	>
		{#if !multiple && section && section.content.length > 0}
			<Button
				variant="default"
				size="icon-sm"
				onclick={() => {
					if (section!.content[0]?.id === undefined) handleAdd();
					else handleEdit(section!.content[0].id);
				}}
				title="Muokkaa"
			>
				<Icon src={PencilSquare} class="size-4" />
			</Button>
		{/if}
		{#if multiple && section && section.content.length > 0}
			<Button
				variant="default"
				size="icon-sm"
				onclick={() => handleAdd()}
				class="flex items-center gap-1"
			>
				<Icon src={Plus} class="size-4" />
			</Button>
		{/if}
		{#if optional}
			<Button
				variant="destructive"
				size="icon-sm"
				onclick={() => handleDisable()}
				class="flex items-center gap-1"
			>
				<Icon src={Trash} class="size-4" />
			</Button>
		{/if}
	</div>
</div>

<EditorDialog bind:open title={isEditing ? 'Muokkaa' : 'Lisää'} {handleSave}>
	{@render editor({ editData, handleSave })}
</EditorDialog>
