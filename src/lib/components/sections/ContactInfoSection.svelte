<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Section from '$lib/components/Section.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Linkedin, Link, Phone, Mail, Calendar, Github } from '@steeze-ui/lucide-icons';

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		name: '',
		title: '',
		email: '',
		phone: '',
		address: '',
		birthday: '',
		linkedin: '',
		github: '',
		website: ''
	});

	const parseLinkedInUsername = (url: string) => {
		const regex = /linkedin\.com\/in\/([a-zA-Z0-9_-]+)/;
		return url.match(regex)?.[1] || '';
	};

	const parseGitHubUsername = (url: string) => {
		const regex = /github\.com\/([a-zA-Z0-9_-]+)/;
		return url.match(regex)?.[1] || '';
	};
</script>

<Section
	title={SectionLabels[SectionKey.CONTACT_INFO]}
	key={SectionKey.CONTACT_INFO}
	class="px-4 relative mb-2"
	{initializeEditor}
>
	{#snippet header()}
		<h3 class="hidden absolute">{SectionLabels[SectionKey.CONTACT_INFO]}</h3>
	{/snippet}
	{#snippet content({ item })}
		<h1 class="text-xl mb-4">{item.name}</h1>
		<div class="flex flex-col text-sm">
			{#if item.birthday}<span class="flex items-center gap-2"
					><Icon src={Calendar} class="size-4" />
					{new Date(item.birthday).toLocaleDateString('fi-FI')}</span
				>{/if}
			{#if item.email}<span class="flex items-center gap-2"
					><Icon src={Mail} class="size-4" /> {item.email}</span
				>{/if}
			{#if item.phone}<span class="flex items-center gap-2"
					><Icon src={Phone} class="size-4" /> {item.phone}</span
				>{/if}
			{#if item.address}<span class="flex items-center gap-2"
					><Icon src={Mail} class="size-4" /> {item.address}</span
				>{/if}

			{#if item.linkedin}<span class="flex items-center gap-2"
					><Icon src={Linkedin} class="size-4" />
					<a href={item.linkedin} target="_blank" class="text-primary hover:underline"
						>@{parseLinkedInUsername(item.linkedin)}</a
					>
				</span>{/if}
			{#if item.github}<span class="flex items-center gap-2"
					><Icon src={Github} class="size-4" />
					<a href={item.github} target="_blank" class="text-primary hover:underline"
						>@{parseGitHubUsername(item.github)}</a
					>
				</span>{/if}
			{#if item.website}<span class="flex items-center gap-2"
					><Icon src={Link} class="size-4" />
					<a href={item.website} target="_blank" class="text-primary hover:underline"
						>{item.website}</a
					>
				</span>{/if}
		</div>
	{/snippet}

	{#snippet editor({ editData, handleSave })}
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Nimi</Label>
				<Input id="name" bind:value={editData.name} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="birthday" class="text-right">Syntymäaika</Label>
				<Input id="birthday" bind:value={editData.birthday} type="date" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Ammattinimike</Label>
				<Input id="title" bind:value={editData.title} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="email" class="text-right">Sähköposti</Label>
				<Input id="email" bind:value={editData.email} type="email" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="phone" class="text-right">Puhelin</Label>
				<Input id="phone" bind:value={editData.phone} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="address" class="text-right">Osoite</Label>
				<Input id="address" bind:value={editData.address} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="linkedin" class="text-right">LinkedIn</Label>
				<Input
					id="linkedin"
					bind:value={editData.linkedin}
					class="col-span-3"
					placeholder="https://..."
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="github" class="text-right">GitHub</Label>
				<Input
					id="github"
					bind:value={editData.github}
					class="col-span-3"
					placeholder="https://..."
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="website" class="text-right">Verkkosivu</Label>
				<Input
					id="website"
					bind:value={editData.website}
					class="col-span-3"
					placeholder="https://..."
				/>
			</div>
		</div>
	{/snippet}
</Section>
