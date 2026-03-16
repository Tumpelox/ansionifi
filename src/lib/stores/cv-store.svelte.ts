import { loadCV, saveCV } from '../utils/storage';
import {
	SectionKey,
	type CV,
	type Section,
	type SectionKeyType,
	type CVMap,
	type ContainerKeyType,
	ContainerKey
} from '../types/cv';

const initializeSection = <K extends SectionKeyType>(
	id: K,
	container: ContainerKeyType | null = null,
	visible: boolean = true
): CV[K] => {
	const data = {
		id,
		container,
		visible,
		content: []
	};
	return data as unknown as CV[K];
};

const initilizeState = (): CV => ({
	[SectionKey.CONTACT_INFO]: initializeSection(SectionKey.CONTACT_INFO, ContainerKey.SIDEBAR),
	[SectionKey.PROFILE_SUMMARY]: initializeSection(SectionKey.PROFILE_SUMMARY, ContainerKey.MAIN),
	[SectionKey.WORK_EXPERIENCE]: initializeSection(
		SectionKey.WORK_EXPERIENCE,
		ContainerKey.MAIN,
		false
	),
	[SectionKey.EDUCATION]: initializeSection(SectionKey.EDUCATION, ContainerKey.SIDEBAR),
	[SectionKey.LANGUAGES]: initializeSection(SectionKey.LANGUAGES, ContainerKey.SIDEBAR, false),
	[SectionKey.SKILLS]: initializeSection(SectionKey.SKILLS, ContainerKey.SIDEBAR, false),
	[SectionKey.ADDITIONAL_TRAINING]: initializeSection(
		SectionKey.ADDITIONAL_TRAINING,
		ContainerKey.SIDEBAR,
		false
	),
	[SectionKey.VOLUNTEER_WORK]: initializeSection(
		SectionKey.VOLUNTEER_WORK,
		ContainerKey.MAIN,
		false
	),
	[SectionKey.GOALS]: initializeSection(SectionKey.GOALS, ContainerKey.MAIN, false),
	[SectionKey.OTHER_INFO]: initializeSection(SectionKey.OTHER_INFO, ContainerKey.MAIN, false),
	[SectionKey.REFERENCES]: initializeSection(SectionKey.REFERENCES, ContainerKey.SIDEBAR, false),
	[SectionKey.PROFILE_PICTURE]: initializeSection(SectionKey.PROFILE_PICTURE, ContainerKey.SIDEBAR)
});

const loadState = () => {
	const savedState = loadCV();

	const initializedState = initilizeState();

	if (savedState) {
		Object.assign(initializedState, savedState);
		return savedState;
	} else {
		return initializedState;
	}
};

let state = $state<CV>(loadState());

$effect.root(() => {
	$effect(() => {
		saveCV(state);
	});
});

export const useState = <K extends SectionKeyType>(key?: K) => {
	if (key !== undefined && !Object.hasOwn(state, key)) {
		state[key] = initializeSection(key) as (typeof state)[K];
	}

	return {
		get data() {
			return state;
		},
		set data(value: CV) {
			state = value;
		},
		getItem(id: string) {
			if (key === undefined) throw new Error('Invalid key');

			const currentSection = state[key];

			return currentSection.content.find((item) => item.id === id) || null;
		},
		setItem(id: string, value: CVMap[K]) {
			if (key === undefined) throw new Error('Invalid key');

			const currentSection = state[key];

			if (currentSection === undefined) return null;

			const index = currentSection.content.findIndex((item) => item.id === id);

			if (index !== -1) {
				(currentSection.content as any[])[index] = value;

				return currentSection.content[index];
			}

			return null;
		},
		addItem(value: CVMap[K]) {
			if (key === undefined) throw new Error('Invalid key');

			const currentSection = state[key];

			if (currentSection === undefined) return null;

			(currentSection.content as any[]).push(value);

			return currentSection.content[currentSection.content.length - 1];
		},
		removeItem(id: string) {
			if (key === undefined) throw new Error('Invalid key');

			const currentSection = state[key];

			if (currentSection === undefined) return null;

			const index = currentSection.content.findIndex((item) => item.id === id);

			if (index !== -1) {
				const removed = currentSection.content[index];

				currentSection.content.splice(index, 1);

				return removed;
			}

			return null;
		},
		setSection<T extends SectionKeyType>(sectionKey: T, value: CV[T]) {
			state[sectionKey] = value;
		},
		updateSection<T extends SectionKeyType>(sectionKey: T, value: Partial<Section<T>>) {
			state[sectionKey] = { ...state[sectionKey], ...value };
		},
		reset() {
			Object.assign(state, initilizeState());
		}
	};
};
