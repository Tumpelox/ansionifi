<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { SectionKey, SectionLabels } from '$lib/types/cv';
	import Section from '$lib/components/Section.svelte';

	const initializeEditor = () => ({
		id: crypto.randomUUID(),
		url: ''
	});
</script>

<Section
	title={SectionLabels[SectionKey.PROFILE_PICTURE]}
	key={SectionKey.PROFILE_PICTURE}
	optional
	class="px-4"
	{initializeEditor}
>
	{#snippet content({ item })}
		<img class="w-full aspect-square object-cover object-center rounded-md" src={item.url} alt="" />
	{/snippet}

	{#snippet editor({ editData, handleSave })}
		<div class="grid gap-4 py-4">
			<Input
				type="file"
				accept="image/*"
				onchange={(e) => {
					const file = e.currentTarget.files?.[0];
					if (file) {
						const reader = new FileReader();
						reader.onload = () => {
							editData.url = reader.result as string;
						};
						reader.readAsDataURL(file);
					}
				}}
			/>
		</div>
	{/snippet}
</Section>
