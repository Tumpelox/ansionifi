<script lang="ts">
	import { MarkdownEditor } from '$lib/components/MarkdownEditor';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SectionKey, SectionLabels, type Interest } from '$lib/types/cv';
	import Markdown from '$lib/components/Markdown.svelte';
	import Section from '$lib/components/Section.svelte';

	interface Props {
		onRemoveSection?: () => void;
	}

	const { onRemoveSection }: Props = $props();

	const initializeEditor = () =>
		({
			id: crypto.randomUUID(),
			interest: '',
			details: ''
		}) as Interest;
</script>

<Section
	title={SectionLabels[SectionKey.GOALS]}
	key={SectionKey.GOALS}
	class="px-4"
	layout="grid"
	multiple
	optional
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.GOALS]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<div class="group relative">
			<div class="flex flex-col gap-2">
				<div
					class="w-full flex justify-between items-center mt-2 mb-1 py-1 px-2 bg-card rounded-md"
				>
					<h4 class="font-semibold text-primary">{item.interest}</h4>
				</div>
			</div>

			{#if item.details}
				<Markdown class="mt-2 px-2" data={item.details} />
			{/if}
		</div>
	{/snippet}
	{#snippet editor({ editData })}
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="interest" class="text-right">Saavutus</Label>
				<Input id="interest" bind:value={editData.interest} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-start gap-4">
				<Label class="pt-2 text-right">Lisätiedot</Label>
				<div class="col-span-3">
					<MarkdownEditor
						bind:value={editData.details}
						placeholder="Pääaine, sivuaineet, arvosanat..."
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Section>
