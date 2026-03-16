<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SectionKey, SectionLabels, type ITSkill } from '$lib/types/cv';
	import { Rating } from '$lib/components/ui/rating';
	import Section from '$lib/components/Section.svelte';

	interface Props {
		onRemoveSection?: () => void;
	}

	const { onRemoveSection }: Props = $props();

	const initializeEditor = () =>
		({
			id: crypto.randomUUID(),
			program: '',
			level: 3
		}) as ITSkill;
</script>

<Section
	title={SectionLabels[SectionKey.SKILLS]}
	key={SectionKey.SKILLS}
	class="px-4 mb-2"
	multiple
	optional
	layout="gridCols4"
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.SKILLS]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<div class="group relative rounded-md bg-muted/30 p-3">
			<div class="flex flex-col">
				<div>
					<h4>{item.program}</h4>
				</div>
			</div>
			{#if item.level}
				<Rating rating={Number(item.level)} />
			{/if}
		</div>
	{/snippet}
	{#snippet editor({ editData })}
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="program" class="text-right">Ohjelma</Label>
				<Input id="program" bind:value={editData.program} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="level" class="text-right">Taso</Label>
				<Input
					id="level"
					type="number"
					min={1}
					max={1}
					bind:value={editData.level}
					class="col-span-3"
				/>
			</div>
		</div>
	{/snippet}
</Section>
