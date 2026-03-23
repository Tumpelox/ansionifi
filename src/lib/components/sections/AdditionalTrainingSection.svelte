<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Section from '$lib/components/Section.svelte';
	import { Datepicker } from '$lib/components/ui/datepicker';

	let { optional = true, onRemoveSection } = $props<{
		optional?: boolean;
		onRemoveSection?: () => void;
	}>();

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		degree: '',
		provider: '',
		date: undefined
	});
</script>

<Section
	title={SectionLabels[SectionKey.ADDITIONAL_TRAINING]}
	key={SectionKey.ADDITIONAL_TRAINING}
	class="mb-2 px-4"
	optional
	multiple
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.ADDITIONAL_TRAINING]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<div class="group relative rounded-md bg-muted/30 p-3">
			<div class="flex flex-col">
				<div>
					<h4 class="text-sm font-semibold">{item.degree}</h4>
					<p class="text-xs text-muted-foreground">{item.provider}</p>
				</div>
				{#if item.date !== undefined}
					<div
						class="font-mono mt-2 text-sm tracking-tight whitespace-nowrap text-muted-foreground"
					>
						{new Date(item.date).toLocaleDateString('fi-FI')}
					</div>
				{/if}
			</div>
		</div>
	{/snippet}

	{#snippet editor({ editData, handleSave })}
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-2">
				<Label for="degree" class="text-right">Kurssi tai tutkinto</Label>
				<Input id="degree" bind:value={editData.degree} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="provider" class="text-right">Järjestäjä</Label>
				<Input id="provider" bind:value={editData.provider} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="date" class="text-right">Päivämäärä</Label>
				<Datepicker bind:value={editData.date} class="col-span-3" placeholder="esim 18.6.1996" />
			</div>
		</div>
	{/snippet}
</Section>
