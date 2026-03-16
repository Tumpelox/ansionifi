export interface ContactInfo {
	id: string;
	name: string;
	title: string;
	email: string;
	phone: string;
	address: string;
	birthday?: string;
	linkedin?: string;
	website?: string;
}

export interface ProfileSummary {
	id: string;
	content: string; // markdown
}

export interface WorkExperience {
	id: string;
	jobTitle: string;
	employer: string;
	startDate: string | undefined;
	endDate: string | undefined;
	details: string; // markdown
}

export const EducationLevel = {
	PERUSKOULU: 'Peruskoulu',
	TOINEN_ASTE: 'Toinen aste',
	ALEMPI_KORKEAKOULU: 'Alempi korkeakoulututkinto',
	YLEMPI_KORKEAKOULU: 'Ylempi korkeakoulututkinto',
	TUTKIJA: 'Tutkija'
};

export interface Education {
	id: string;
	degree: string;
	level: (typeof EducationLevel)[keyof typeof EducationLevel] | '';
	school: string;
	startDate: string | undefined;
	endDate: string | undefined;
	details: string | undefined; // markdown
}

export interface Language {
	id: string;
	language: string;
	level: string;
	certificate?: string;
}

export interface ProfilePicture {
	id: string;
	url: string;
}

export interface ITSkill {
	id: string;
	program: string;
	level: number;
}

export interface AdditionalTraining {
	id: string;
	degree: string;
	provider: string;
	date: string | undefined;
}

export interface VolunteerWork {
	id: string;
	role: string;
	organization: string;
	startDate: string | undefined;
	endDate: string | undefined;
	details: string; // markdown
}

export interface Interest {
	id: string;
	interest: string;
	details: string;
}

export interface OtherInfo {
	id: string;
	content: string; // markdown
}

export interface Reference {
	id: string;
	name: string;
	company: string;
	phone: string;
	email: string;
}

export const ContainerKey = {
	SIDEBAR: 'sidebar',
	MAIN: 'main',
	HEADER: 'header',
	FOOTER: 'footer',
	DOCUMENT: 'document'
};

export type ContainerKeyType = (typeof ContainerKey)[keyof typeof ContainerKey];

export type SectionType =
	| ContactInfo
	| ProfilePicture
	| ProfileSummary
	| WorkExperience
	| Education
	| Language
	| ITSkill
	| AdditionalTraining
	| VolunteerWork
	| Interest
	| OtherInfo
	| Reference;

export const SectionKey = {
	CONTACT_INFO: 'contactInfo',
	PROFILE_SUMMARY: 'profileSummary',
	WORK_EXPERIENCE: 'workExperience',
	EDUCATION: 'education',
	LANGUAGES: 'languages',
	SKILLS: 'skills',
	ADDITIONAL_TRAINING: 'additionalTraining',
	VOLUNTEER_WORK: 'volunteerWork',
	GOALS: 'goals',
	OTHER_INFO: 'otherInfo',
	REFERENCES: 'references',
	PROFILE_PICTURE: 'profilePicture'
} as const;

export type SectionKeyType = (typeof SectionKey)[keyof typeof SectionKey];

export interface Section<K extends SectionKeyType> {
	id: K;
	container: (typeof SectionKey)[keyof typeof SectionKey] | null;
	visible: boolean;
	content: CVMap[K][];
}

export interface CVMap {
	[SectionKey.CONTACT_INFO]: ContactInfo;
	[SectionKey.PROFILE_SUMMARY]: ProfileSummary;
	[SectionKey.WORK_EXPERIENCE]: WorkExperience;
	[SectionKey.EDUCATION]: Education;
	[SectionKey.LANGUAGES]: Language;
	[SectionKey.SKILLS]: ITSkill;
	[SectionKey.ADDITIONAL_TRAINING]: AdditionalTraining;
	[SectionKey.VOLUNTEER_WORK]: VolunteerWork;
	[SectionKey.GOALS]: Interest;
	[SectionKey.OTHER_INFO]: OtherInfo;
	[SectionKey.REFERENCES]: Reference;
	[SectionKey.PROFILE_PICTURE]: ProfilePicture;
}

export type CV = {
	[K in SectionKeyType]: Section<K>;
};

export const SectionLabels = {
	[SectionKey.CONTACT_INFO]: 'Yhteystiedot',
	[SectionKey.PROFILE_SUMMARY]: 'Profiili',
	[SectionKey.WORK_EXPERIENCE]: 'Työkokemus',
	[SectionKey.EDUCATION]: 'Koulutus',
	[SectionKey.LANGUAGES]: 'Kielet',
	[SectionKey.SKILLS]: 'Erikoisosaaminen',
	[SectionKey.ADDITIONAL_TRAINING]: 'Pätevyydet',
	[SectionKey.VOLUNTEER_WORK]: 'Muut tehtävät',
	[SectionKey.GOALS]: 'Saavutukset',
	[SectionKey.OTHER_INFO]: 'Muut tiedot',
	[SectionKey.REFERENCES]: 'Suosittelijat',
	[SectionKey.PROFILE_PICTURE]: 'Profiilikuva'
};
