<script lang="ts">
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Markdown from '$lib/components/Markdown.svelte';
	import { MarkdownEditor } from '$lib/components/MarkdownEditor';
	import Section from '$lib/components/Section.svelte';

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		content: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.PROFILE_SUMMARY]}
	key={SectionKey.PROFILE_SUMMARY}
	optional
	class="px-4"
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.PROFILE_SUMMARY]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<Markdown class="mt-2" data={item.content} />
	{/snippet}
	{#snippet editor({ editData })}
		<div class="py-4">
			<MarkdownEditor bind:value={editData.content} placeholder="Kerro jotain itsestäsi..." />
		</div>
	{/snippet}
</Section>
