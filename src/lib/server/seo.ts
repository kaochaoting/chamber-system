// JSON-LD Schema 生成工具

export interface PersonSchema {
	name: string;
	url?: string;
	image?: string;
	description?: string;
	email?: string;
	contactPoint?: {
		telephone?: string;
	};
}

export interface OrganizationSchema {
	name: string;
	url?: string;
	image?: string;
	description?: string;
	foundingDate?: string;
}

export interface ArticleSchema {
	headline: string;
	description: string;
	image?: string;
	datePublished: string;
	dateModified: string;
	author: {
		name: string;
	};
}

export function generatePersonSchema(data: PersonSchema): string {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: data.name,
		...(data.url && { url: data.url }),
		...(data.image && { image: data.image }),
		...(data.description && { description: data.description }),
		...(data.email && { email: data.email }),
		...(data.contactPoint && { contactPoint: data.contactPoint })
	};

	return JSON.stringify(schema);
}

export function generateOrganizationSchema(data: OrganizationSchema): string {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: data.name,
		...(data.url && { url: data.url }),
		...(data.image && { image: data.image }),
		...(data.description && { description: data.description }),
		...(data.foundingDate && { foundingDate: data.foundingDate })
	};

	return JSON.stringify(schema);
}

export function generateArticleSchema(data: ArticleSchema): string {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.headline,
		description: data.description,
		...(data.image && { image: data.image }),
		datePublished: data.datePublished,
		dateModified: data.dateModified,
		author: data.author
	};

	return JSON.stringify(schema);
}
