<script lang="ts">
	import { MarkdownEditor } from '$lib/components/MarkdownEditor';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Section from '$lib/components/Section.svelte';
	import { Datepicker } from '$lib/components/ui/datepicker';
	import DateString from '$lib/components/DateString.svelte';
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Markdown from '$lib/components/Markdown.svelte';

	let { optional = true, onRemoveSection } = $props<{
		optional?: boolean;
		onRemoveSection?: () => void;
	}>();

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		role: '',
		organization: '',
		startDate: undefined,
		endDate: undefined,
		details: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.VOLUNTEER_WORK]}
	key={SectionKey.VOLUNTEER_WORK}
	class="px-4"
	layout="grid"
	multiple
	optional
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.VOLUNTEER_WORK]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<div class="group relative">
			<div class="flex flex-col gap-2">
				<div class="w-full flex justify-between items-center mt-2 mb-1 gap-4">
					<h4 class="font-semibold text-primary py-1 px-2 bg-card rounded-md w-full">
						{item.role}
					</h4>
				</div>

				<p class="text-sm bg-card/80 py-[0.375rem] px-2 rounded-md w-full">
					{item.organization}
				</p>
				<DateString
					class="bg-card rounded-md-md px-2 py-[0.375rem] font-mono text-sm tracking-tight whitespace-nowrap text-muted-foreground"
					startDate={item.startDate}
					endDate={item.endDate}
				/>
			</div>

			{#if item.details}
				<Markdown class="mt-2" data={item.details} />
			{/if}
		</div>
	{/snippet}
	{#snippet editor({ editData })}
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-2">
				<Label for="role" class="text-right">Tehtävä</Label>
				<Input id="role" bind:value={editData.role} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="organization" class="text-right">Taho</Label>
				<Input id="organization" bind:value={editData.organization} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="startDate" class="text-right">Aloituspäivä</Label>
				<Datepicker
					bind:value={editData.startDate}
					class="col-span-3"
					placeholder="esim. 24.6.1995"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="endDate" class="text-right">Lopetuspäivä</Label>
				<Datepicker bind:value={editData.endDate} class="col-span-3" placeholder="esim. 2.3.1998" />
			</div>
			<div class="flex flex-col gap-2">
				<Label class="pt-2 text-right">Lisätiedot</Label>
				<div class="col-span-3">
					<MarkdownEditor bind:value={editData.details} placeholder="Kuvaus tehtävistäsi..." />
				</div>
			</div>
		</div>
	{/snippet}
</Section>
