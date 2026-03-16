<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { render } from 'svelte/server';
	import { cn } from '$lib/utils';

	const { data, class: className }: { data: string; class?: string } = $props();

	const rawHtml = $derived(marked.parse(data));
	const cleanHtml = $derived(DOMPurify.sanitize(rawHtml));
</script>

<div
	class={cn(
		'prose dark:prose-invert max-w-none text-sm text-foreground/80 leading-relaxed',
		className
	)}
>
	{@html cleanHtml}
</div>
