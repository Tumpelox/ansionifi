<script lang="ts">
	import { dateString } from '$lib/utils/dateString';

	interface Props {
		class?: string;
		startDate: string | undefined;
		endDate: string | undefined;
	}

	const { class: className = '', startDate, endDate }: Props = $props();

	const date = $derived(dateString(startDate, endDate));
</script>

{#if date}
	<div class={className}>
		{date}
	</div>
{/if}
