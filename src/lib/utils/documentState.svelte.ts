import { ContainerKey } from '$lib/types/cv';
import { SvelteMap } from 'svelte/reactivity';

export const trackedElements: SvelteMap<HTMLElement, string | null> = new SvelteMap();

export let printConfig = $state({
	pageHeight: 1122
});

/**
 * Svelte Action to attach to elements you want to monitor.
 * Usage: <div use:trackPrint>
 */
export function trackPrint(node: HTMLElement, parentId: string | null) {
	function updateMeasurements() {
		trackedElements.set(node, parentId);
	}

	// Initial measurement
	updateMeasurements();

	return {
		update() {
			updateMeasurements();
		},
		destroy() {
			trackedElements.delete(node);
		}
	};
}

const calculatePage = (top: number, bottom: number): { startPage: number; endPage: number } => {
	const startPage = Math.ceil(Math.abs(top) / printConfig.pageHeight);
	const endPage = Math.ceil((Math.abs(bottom) + 24) / printConfig.pageHeight);

	return { startPage, endPage };
};

const calculateNodePosition = (node: HTMLElement) => {
	const documentContainer = document.getElementById(ContainerKey.DOCUMENT);

	if (!documentContainer) {
		console.warn('Printtimonitori: Elementtiä id="document" ei löytynyt sivulta.');
		// Palautetaan nollat fallbackina, jottei sovellus kaadu
		return { top: 0, bottom: 0, height: 0 };
	}

	const containerRect = documentContainer.getBoundingClientRect();
	const nodeRect = node.getBoundingClientRect();

	const top = nodeRect.top - containerRect.top;
	const height = nodeRect.height;
	const bottom = top + height;

	return { top, bottom, height };
};

export const listenPrint = (mainNode: HTMLElement) => {
	const modifiedElements = new Set<HTMLElement>();

	const watermark = document.createElement('a');
	watermark.id = 'watermark';
	watermark.href = 'https://ansioni.fi';
	watermark.target = '_blank';
	watermark.classList.add(
		'absolute',
		'text-primary',
		'dark:text-muted-foreground',
		'text-sm',
		'opacity-100',
		'font-light'
	);
	watermark.textContent = 'Ansioni.fi';
	watermark.style.top = `${printConfig.pageHeight - 22}px`;
	watermark.style.right = '5px';

	const startPrint = () => {
		mainNode.style.minWidth = '210mm';

		const nodes = new Map<HTMLElement, { parentId: string | null }>();
		const documentContainer = document.getElementById(ContainerKey.DOCUMENT);

		if (!documentContainer) {
			console.warn('Printtimonitori: Elementtiä id="document" ei löytynyt sivulta.');
			return;
		}

		let mostBottomPoint = 0;

		for (const [node, parentId] of trackedElements.entries()) {
			nodes.set(node, { parentId });
		}

		const applyMargins = () => {
			const sortedNodes = [...nodes.entries()].sort((a, b) => {
				const aTop = a[0].getBoundingClientRect().top;
				const bTop = b[0].getBoundingClientRect().top;
				return aTop - bTop;
			});

			for (const [node, data] of sortedNodes) {
				const { parentId } = data;

				const { top, bottom, height } = calculateNodePosition(node);

				const { startPage, endPage } = calculatePage(top, bottom);

				if (bottom > mostBottomPoint) {
					mostBottomPoint = bottom;
				}

				const pageEnd = endPage * printConfig.pageHeight;

				if (pageEnd < bottom || startPage < endPage) {
					if (parentId) {
						const parent = document.getElementById(parentId);

						if (!parent) return;

						const { top: parentTop, bottom: parentBottom } = calculateNodePosition(parent);

						// parent.style.backgroundColor = 'red';
						parent.style.marginTop = `calc(var(--spacing) * 4 + ${1122 - parentTop}px)`;
						modifiedElements.add(parent);
					} else {
						// node.style.backgroundColor = 'red';
						node.style.marginTop = `calc(var(--spacing) * 4 + ${1122 - top}px)`;
						modifiedElements.add(node);
					}
				}
			}
		};

		applyMargins();

		const pages = Math.ceil(Math.floor(mostBottomPoint) / printConfig.pageHeight);

		mainNode.style.minHeight = `${pages * printConfig.pageHeight}px`;

		mainNode.appendChild(watermark);
	};

	window.addEventListener('beforeprint', startPrint);

	const removeMargins = () => {
		for (const node of modifiedElements) {
			// node.style.backgroundColor = '';
			node.style.marginTop = '';
			modifiedElements.delete(node);
		}

		mainNode.style.minHeight = '';
		mainNode.style.minWidth = '';
		mainNode.removeChild(watermark);
	};

	window.addEventListener('afterprint', removeMargins);

	return {
		destroy() {
			window.removeEventListener('beforeprint', startPrint);
			window.removeEventListener('afterprint', removeMargins);
		}
	};
};
