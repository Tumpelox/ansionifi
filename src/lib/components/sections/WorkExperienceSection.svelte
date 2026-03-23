<script lang="ts">
	import { MarkdownEditor } from '$lib/components/MarkdownEditor';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import Section from '$lib/components/Section.svelte';
	import { Datepicker } from '$lib/components/ui/datepicker';
	import DateString from '$lib/components/DateString.svelte';
	import Markdown from '$lib/components/Markdown.svelte';

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		jobTitle: '',
		employer: '',
		startDate: undefined,
		endDate: undefined,
		details: ''
	});
</script>

<Section title="Työkokemus" key="workExperience" class="px-4" multiple optional {initializeEditor}>
	{#snippet header()}
		<h3>Työkokemus</h3>
	{/snippet}

	{#snippet content({ item })}
		<div class="group">
			<div class="flex flex-col gap-2">
				<div class="w-full flex justify-between items-center mt-2 mb-1 gap-4">
					<h4 class="font-semibold text-primary py-1 px-2 bg-card rounded-md w-full">
						{item.jobTitle}
					</h4>
					<DateString
						class="bg-card rounded-md px-2 py-[0.375rem] font-mono text-sm tracking-tight whitespace-nowrap text-muted-foreground"
						startDate={item.startDate}
						endDate={item.endDate}
					/>
				</div>
				{#if item.employer}
					<p class="text-sm bg-card/80 py-[0.375rem] px-2 rounded-md w-fit">
						{item.employer}
					</p>
				{/if}
			</div>

			{#if item.details}
				<Markdown class="mt-2" data={item.details} />
			{/if}
		</div>
	{/snippet}
	{#snippet editor({ editData })}
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-2">
				<Label for="jobTitle" class="text-right">Tehtävänimike</Label>
				<Input id="jobTitle" bind:value={editData.jobTitle} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="employer" class="text-right">Työnantaja</Label>
				<Input id="employer" bind:value={editData.employer} class="col-span-3" />
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
					<MarkdownEditor
						bind:value={editData.details}
						placeholder="Työtehtävät ja saavutukset..."
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Section>
