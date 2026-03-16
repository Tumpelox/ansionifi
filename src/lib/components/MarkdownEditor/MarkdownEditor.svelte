<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import './theme.css';
	import DOMPurify from 'isomorphic-dompurify';

	let { value = $bindable(), placeholder = '' } = $props();

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});
</script>

<div class="overflow-hidden rounded-md border bg-background">
	<MarkdownEditor theme="ansiosi" {carta} bind:value {placeholder} />
</div>

<style>
	:global(.carta-font-code) {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: var(--text-sm--line-height);
		letter-spacing: normal;
	}
</style>
