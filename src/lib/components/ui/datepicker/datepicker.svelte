<script lang="ts">
	import {
		type DateValue,
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDateTime
	} from '@internationalized/date';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = WithElementRef<{
		value: string | undefined;
		class: string;
		placeholder?: string;
	}>;

	let {
		ref = $bindable(null),
		value: valueProp = $bindable(),
		class: className,
		placeholder,
		...restProps
	}: Props = $props();

	const df = new DateFormatter('fi-FI', {
		dateStyle: 'short',
		timeZone: 'Europe/Helsinki'
	});

	let value = $state<DateValue | undefined>(
		typeof valueProp === 'string' ? parseDateTime(valueProp || '') : undefined
	);

	$effect(() => {
		valueProp = value?.toString();
	});
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class={cn('justify-start text-start font-normal', !value && 'text-muted-foreground')}
				{...props}
			>
				{value || false ? df.format(value.toDate(getLocalTimeZone())) : placeholder}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value type="single" initialFocus captionLayout="dropdown" />
	</Popover.Content>
</Popover.Root>
