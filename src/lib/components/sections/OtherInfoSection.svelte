<script lang="ts">
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Markdown from '$lib/components/Markdown.svelte';
	import { MarkdownEditor } from '$lib/components/MarkdownEditor';
	import Section from '$lib/components/Section.svelte';

	let { optional = true, onRemoveSection } = $props<{
		optional?: boolean;
		onRemoveSection?: () => void;
	}>();

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		content: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.OTHER_INFO]}
	key={SectionKey.OTHER_INFO}
	optional
	class="px-4"
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.OTHER_INFO]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<Markdown class="mt-2" data={item.content} />
	{/snippet}
	{#snippet editor({ editData })}
		<div class="py-4">
			<MarkdownEditor bind:value={editData.content} placeholder="Anna lisätietoja..." />
		</div>
	{/snippet}
</Section>
