<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Section from '$lib/components/Section.svelte';

	let { optional = false, onRemoveSection } = $props<{
		optional?: boolean;
		onRemoveSection?: () => void;
	}>();

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		language: '',
		level: '',
		certificate: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.LANGUAGES]}
	key={SectionKey.LANGUAGES}
	class="px-4 mb-2"
	multiple
	optional
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.LANGUAGES]}</h3>
	{/snippet}

	{#snippet content({ item })}
		<div class="group relative rounded-md bg-muted/30 p-3">
			<div class="flex flex-col">
				<span class="font-semibold text-foreground">{item.language}</span>
				<span class="font-medium text-primary">{item.level}</span>
				{#if item.certificate}
					<span class="mt-1 text-xs text-muted-foreground">{item.certificate}</span>
				{/if}
			</div>
		</div>
	{/snippet}
	{#snippet editor({ editData })}
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-2">
				<Label for="language" class="text-right">Kieli</Label>
				<Input
					id="language"
					bind:value={editData.language}
					class="col-span-3"
					placeholder="esim. Englanti"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="level" class="text-right">Taso</Label>
				<Input
					id="level"
					bind:value={editData.level}
					class="col-span-3"
					placeholder="esim. Sujuva / B2"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="certificate" class="text-right">Tutkinto</Label>
				<Input id="certificate" bind:value={editData.certificate} class="col-span-3" />
			</div>
		</div>
	{/snippet}
</Section>
