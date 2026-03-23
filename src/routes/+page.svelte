<script lang="ts">
	import ContactInfoSection from '$lib/components/sections/ContactInfoSection.svelte';
	import ProfileSection from '$lib/components/sections/ProfileSection.svelte';
	import WorkExperienceSection from '$lib/components/sections/WorkExperienceSection.svelte';
	import EducationSection from '$lib/components/sections/EducationSection.svelte';
	import LanguagesSection from '$lib/components/sections/LanguagesSection.svelte';
	import ITSkillsSection from '$lib/components/sections/ITSkillsSection.svelte';
	import AdditionalTrainingSection from '$lib/components/sections/AdditionalTrainingSection.svelte';
	import VolunteerWorkSection from '$lib/components/sections/VolunteerWorkSection.svelte';
	import GoalsSection from '$lib/components/sections/GoalsSection.svelte';
	import OtherInfoSection from '$lib/components/sections/OtherInfoSection.svelte';
	import ReferencesSection from '$lib/components/sections/ReferencesSection.svelte';

	import ThemeConfigurator from '$lib/components/ThemeConfigurator.svelte';
	import { Button } from '$lib/components/ui/button';
	import { useState } from '$lib/stores/cv-store.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Printer, DocumentDuplicate, ArrowDownTray, Plus, Trash } from '@steeze-ui/heroicons';
	import * as Dialog from '$lib/components/ui/dialog';
	import { SectionKey, ContainerKey, SectionLabels } from '$lib/types/cv';
	import ProfilePicture from '$lib/components/sections/ProfilePicture.svelte';
	import { listenPrint } from '$lib/utils/documentState.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import Logo from '$lib/components/Logo.svelte';

	const { data, setSection, updateSection, reset } = useState();

	let darkTheme = $state(false);

	let isThemeDialogOpen = $state(false);
	let isAddSectionDialogOpen = $state(false);

	function printCV() {
		window.print();
	}

	function resetCV() {
		if (confirm('Haluatko varmasti tyhjentää koko CV:n? Tätä toimintoa ei voi perua.')) {
			reset();
		}
	}

	function loadExampleData() {
		if (confirm('Tämä korvaa nykyisen CV:n esimerkkidatalla. Jatketaanko?')) {
			console.log('Loading example data');
		}
	}

	// const handleDrop = (state: DragDropState<SectionType>) => {
	// 	const { sourceContainer, targetContainer, draggedItem } = state;

	// 	console.log('Lähde: ', sourceContainer);
	// 	console.log('Kohde: ', targetContainer);
	// 	console.log('Item: ', draggedItem);
	// };

	const sidebarSections = $derived.by(() => {
		return Object.values(data)
			.filter((section) => section.container === ContainerKey.SIDEBAR && section.visible)
			.map((section) => section.id);
	});

	const mainSections = $derived.by(() => {
		return Object.values(data)
			.filter((section) => section.container === ContainerKey.MAIN && section.visible)
			.map((section) => section.id);
	});

	const hiddenSections = $derived.by(() => {
		return Object.values(data).filter((section) => !section.visible);
	});

	const downloadCV = () => {
		const json = JSON.stringify(data);
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'cv.ansioni';
		a.click();
		URL.revokeObjectURL(url);
	};
</script>

<svelte:head>
	<title>Ansioni</title>
</svelte:head>

<div
	class="min-h-screen bg-white/20 dark:bg-black/60 font-sans text-foreground print:bg-background print:text-foreground relative overflow-x-auto print:overflow-x-hidden px-2 md:px-4 print:px-0"
>
	<!-- Top Navigation Navbar -->
	<header
		class="container scheme-dark mx-auto absolute top-6 right-1/2 translate-x-1/2 z-40 w-[calc(100%-var(--spacing)*4)] md:w-[calc(100%-var(--spacing)*8)] h-fit bg-card shadow-lg print:hidden rounded-2xl"
	>
		<div class="flex items-center justify-between px-4 py-2">
			<div class="flex items-center gap-2">
				<h1
					class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-bold text-transparent"
				>
					<Logo class="h-10" />
				</h1>
			</div>
			<p>by 👐🏻 of tuomas tornberg</p>
		</div>
	</header>

	<main
		class="container flex flex-col xl:grid grid-cols-12 gap-4 mx-auto print:block print:mx-0 min-h-screen pt-[calc(var(--spacing)*28)] print:pt-0 col-span-7 mb-16 print:mb-0"
	>
		<section
			use:listenPrint
			class:dark={darkTheme}
			class="mx-auto print:mx-0 print:max-w-[210mm] print:min-w-[210mm] print:max-w-[210mm] w-full flex flex-col relative order-2 xl:order-1 col-span-9 2xl:col-span-8 bg-background rounded-md print:rounded-none shadow-lg print:shadow-none"
		>
			<div
				id={ContainerKey.DOCUMENT}
				class="relative flex flex-col md:grid print:grid grid-cols-6 min-h-[297mm] grow print:mb-0"
			>
				<div
					// use:droppable={{ container: ContainerKey.SIDEBAR, callbacks: { onDrop: handleDrop } }}
					class="relative col-span-2 grow bg-card text-card-foreground pb-16 print:pb-0 rounded-l-md print:rounded-none"
				>
					<div id="sidebar" class="flex flex-col gap-6 py-4">
						<h2 class="hidden absolute">Perustiedot</h2>
						<ProfilePicture />
						<ContactInfoSection />
						<EducationSection />
						<LanguagesSection />
						{#if sidebarSections.includes(SectionKey.ADDITIONAL_TRAINING)}
							<AdditionalTrainingSection />
						{/if}
						{#if mainSections.includes(SectionKey.OTHER_INFO)}<OtherInfoSection />{/if}
					</div>
				</div>

				<div
					id="main"
					// use:droppable={{ container: ContainerKey.MAIN, callbacks: { onDrop: handleDrop } }}
					class="col-span-4 flex flex-col gap-6 text-foreground py-4 pb-16 print:pb-0 rounded-r-md print:rounded-none"
				>
					<h2 class="hidden absolute">Minusta</h2>
					<ProfileSection />
					<WorkExperienceSection />
					{#if mainSections.includes(SectionKey.VOLUNTEER_WORK)}<VolunteerWorkSection />{/if}
					{#if mainSections.includes(SectionKey.GOALS)}<GoalsSection />{/if}
					{#if sidebarSections.includes(SectionKey.REFERENCES)}
						<ReferencesSection />
					{/if}
					{#if sidebarSections.includes(SectionKey.SKILLS)}
						<ITSkillsSection />
					{/if}
				</div>
			</div>
			<div class="absolute bottom-[calc(var(--spacing)*4)] w-full flex justify-center print:hidden">
				<Button
					variant="outline"
					onclick={() => (isAddSectionDialogOpen = true)}
					class="border-2 border-dashed text-muted-foreground hover:border-primary/50 hover:text-foreground"
				>
					<Icon src={Plus} class="mr-2 h-4 w-4" />
					Lisää osio...
				</Button>
			</div>
		</section>
		<section class="flex flex-col gap-4 col-span-3 2xl:col-span-4 order-1 xl:order-2 print:hidden">
			<div class="flex flex-col gap-4 py-2 px-4 bg-card text-card-foreground rounded-md shadow">
				<h2 class="mt-2 mb-1">Tervetuloa käyttämään ansioni CV -editoria</h2>
				<p>
					Ohjelman käyttö on täysin anonyymiä ja kaikki tietosi pysyvät vain laitteellasi. Tekemäsi
					työ tallentuu laitteen muistiin, joten voit jatkaa siitä, mihin jäit. Voit myös
					varmuuskopioida tietosi painamalla "Lataa" -painiketta.
				</p>
				<p>
					Kaikki sovelluksen toiminnot kuten PDF tulostus ei välttämättä toimi oikein kännykällä.
				</p>
			</div>

			<div
				class="prose max-w-full w-full h-fit print:hidden py-2 px-4 bg-card text-card-foreground rounded-md shadow"
			>
				<h3 class="mt-2 mb-1 font-bold text-lg">Lisätietoja</h3>
				<p>
					Sovellus on aktiivisen kehityksen kohteena, joten siinä voi esiintyä virheitä ja puutteita
					sekä osa tiedosta voi kadota päivitysten myötä. Pyrimme kuitenkin välttämään tälläisiä
					muutoksia.
				</p>
				<p>
					Kaikki palaute on erittäin tervetullutta, joten jos sinulla on ehdotuksia tai kohtasit
					ongelmia, älä epäröi ottaa yhteyttä! Voit lähettää viestiä LinkedIn:issä{' '}
					<a
						href="https://linkedin.com/in/tuomastornberg"
						target="_blank"
						rel="noopener noreferrer"
					>
						@tuomastornberg
					</a>
				</p>
			</div>

			<div class="flex flex-col gap-4 py-2 px-4 bg-card text-card-foreground rounded-md shadow">
				<h3 class="mt-2 mb-1">Asetukset</h3>
				<div class="flex gap-4 flex-wrap items-center justify-between">
					<div class="flex items-center space-x-2">
						<Switch id="dark-theme" bind:checked={darkTheme} />
						<Label for="dark-theme">{darkTheme ? 'Vaalea teema' : 'Tumma teema'}</Label>
					</div>
					<Button
						variant="secondary"
						size="sm"
						onclick={downloadCV}
						class="ml-2 gap-2 shadow-sm shadow-primary/20"
					>
						<Icon src={ArrowDownTray} class="h-4 w-4" />
						<span>Lataa tiedot</span>
					</Button>
					<Button variant="destructive" size="sm" onclick={resetCV} title="Tyhjennä CV">
						<Icon src={Trash} class="h-4 w-4 md:mr-2" />
						<span class="hidden md:inline">Tyhjennä tiedot</span>
					</Button>
				</div>
				<div class="">
					<Button
						variant="default"
						size="sm"
						onclick={printCV}
						class="ml-2 gap-2 shadow-sm shadow-primary/20 float-end"
					>
						<Icon src={Printer} class="h-4 w-4" />
						<span>Tulosta</span>
					</Button>
				</div>
			</div>
		</section>
	</main>
</div>

<!-- Extra Dialogs -->
<Dialog.Root bind:open={isThemeDialogOpen}>
	<Dialog.Content class="sm:max-w-[600px]">
		<ThemeConfigurator />
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={isAddSectionDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Lisää osio</Dialog.Title>
			<Dialog.Description>Valitse osio, jonka haluat lisätä CV:hen</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-3 py-4">
			{#each hiddenSections as section}
				<Button
					variant="outline"
					class="w-full justify-start"
					onclick={() => {
						updateSection(section.id, { visible: true });
						isAddSectionDialogOpen = false;
					}}
				>
					<Icon src={Plus} class="mr-2 h-4 w-4" />
					{SectionLabels[section.id]}
				</Button>
			{/each}

			{#if hiddenSections.length === 0}
				<p class="text-center text-sm text-muted-foreground italic">Kaikki osiot on jo lisätty.</p>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
