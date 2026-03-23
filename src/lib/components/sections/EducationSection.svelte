<script lang="ts">
	import { MarkdownEditor } from '$lib/components/MarkdownEditor';
	import { Datepicker } from '$lib/components/ui/datepicker';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { EducationLevel, SectionKey, SectionLabels } from '$lib/types/cv';
	import DateString from '$lib/components/DateString.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import Section from '$lib/components/Section.svelte';

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		degree: '',
		school: '',
		startDate: undefined,
		endDate: undefined,
		details: '',
		level: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.EDUCATION]}
	key={SectionKey.EDUCATION}
	class="px-4 mb-2"
	multiple
	optional
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.EDUCATION]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<div class="group relative rounded-md bg-muted/30 p-3">
			<div class="flex flex-col">
				<div>
					<h4 class="text-sm font-semibold">{item.degree}</h4>
					<p class="text-xs text-muted-foreground">{item.school}</p>
				</div>
				<DateString
					class="font-mono mt-2 text-sm tracking-tight whitespace-nowrap text-muted-foreground"
					startDate={item.startDate}
					endDate={item.endDate}
				/>
			</div>

			{#if item.details}
				<Markdown class="mt-2" data={item.details} />
			{/if}
		</div>
	{/snippet}

	{#snippet editor({ editData, handleSave })}
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-2">
				<Label for="degree" class="text-right">Tutkinto</Label>
				<Input id="degree" bind:value={editData.degree} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="school" class="text-right">Oppilaitos</Label>
				<Input id="school" bind:value={editData.school} class="col-span-3" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="startDate" class="text-right">Aloituspäivä</Label>
				<Datepicker
					bind:value={editData.startDate}
					class="col-span-3"
					placeholder="esim 24.6.1995"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="endDate" class="text-right">Loppupäivä</Label>
				<Datepicker bind:value={editData.endDate} class="col-span-3" placeholder="esim 2.3.1998" />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="level" class="text-right">Taso</Label>
				<Select type="single" bind:value={editData.level}>
					<SelectTrigger>
						{EducationLevel[editData.level as keyof typeof EducationLevel] ?? 'Valitse taso'}
					</SelectTrigger>
					<SelectContent>
						{#each Object.entries(EducationLevel) as [key, value]}
							<SelectItem value={key}>{value}</SelectItem>
						{/each}
					</SelectContent>
				</Select>
			</div>
			<div class="flex flex-col gap-2">
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
