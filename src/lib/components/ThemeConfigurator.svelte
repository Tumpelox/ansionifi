<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let themeCss = $state('');

	onMount(() => {
		const saved = localStorage.getItem('cv-builder-theme');
		if (saved) {
			themeCss = saved;
			applyTheme(saved);
		}
	});

	function applyTheme(css: string) {
		const rootStyle = document.documentElement.style;
		// Matches --variable: value;
		const matches = css.matchAll(/(--[\w-]+):\s*([^;]+);/g);
		let found = false;
		for (const match of matches) {
			const property = match[1].trim();
			const value = match[2].trim();
			rootStyle.setProperty(property, value);
			found = true;
		}
		return found;
	}

	function handleApply() {
		if (applyTheme(themeCss)) {
			localStorage.setItem('cv-builder-theme', themeCss);
			alert('Teema tallennettu ja otettu käyttöön!');
		} else {
			alert('Ei löytynyt valideja CSS-muuttujia (muotoa --muuttuja: arvo;).');
		}
	}

	function handleReset() {
		localStorage.removeItem('cv-builder-theme');
		window.location.reload();
	}
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Vaihda teemaa</Card.Title>
		<Card.Description>
			Syötä tähän shadcn-tyyppiset CSS-muuttujat (esim. :root osio shadcn-tiedostosta)
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-4">
		<div class="space-y-2">
			<Label for="theme-css">CSS muuttujat</Label>
			<Textarea
				id="theme-css"
				bind:value={themeCss}
				placeholder="--primary: oklch(0.205 0 0); ..."
				rows={10}
			/>
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button variant="outline" onclick={handleReset}>Palauta oletus</Button>
		<Button onclick={handleApply}>Ota käyttöön</Button>
	</Card.Footer>
</Card.Root>
