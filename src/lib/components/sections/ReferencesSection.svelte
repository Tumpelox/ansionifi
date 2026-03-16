<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Section from '$lib/components/Section.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Mail, Phone } from '@steeze-ui/lucide-icons';

	let { optional = true, onRemoveSection } = $props<{
		optional?: boolean;
		onRemoveSection?: () => void;
	}>();

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		name: '',
		company: '',
		phone: '',
		email: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.REFERENCES]}
	key={SectionKey.REFERENCES}
	class="px-4"
	layout="grid"
	multiple
	optional
	{initializeEditor}
>
	{#snippet header()}
		<h3>{SectionLabels[SectionKey.REFERENCES]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<div class="group relative rounded-md bg-muted/30 p-3 h-full flex flex-col justify-between">
			<h4 class="text-sm font-bold">{item.name}</h4>
			{#if item.company}
				<p class="text-sm text-primary">{item.company}</p>
			{/if}
			<div class="flex flex-col gap-2 text-sm text-muted-foreground">
				{#if item.email}<span class="flex items-center gap-2"
						><Icon src={Mail} class="size-4" /> {item.email}</span
					>{/if}
				{#if item.phone}<span class="flex items-center gap-2"
						><Icon src={Phone} class="size-4" /> {item.phone}</span
					>{/if}
			</div>
		</div>
	{/snippet}
	{#snippet editor({ editData })}
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Nimi</Label>
				<Input id="name" bind:value={editData.name} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="company" class="text-right">Organisaatio</Label>
				<Input id="company" bind:value={editData.company} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="phone" class="text-right">Puhelin</Label>
				<Input id="phone" bind:value={editData.phone} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="email" class="text-right">Sähköposti</Label>
				<Input id="email" bind:value={editData.email} type="email" class="col-span-3" />
			</div>
		</div>
	{/snippet}
</Section>
