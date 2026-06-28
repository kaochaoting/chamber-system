type Json = Record<string, unknown>;

/** 成員（Person）+ 其創業（Organization）的 JSON-LD。 */
export function memberJsonLd(opts: {
	name: string;
	url: string;
	bio?: string | null;
	socials?: Record<string, string> | null;
	venture?: { name: string; url?: string | null; description?: string | null } | null;
}): Json {
	const person: Json = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: opts.name,
		url: opts.url
	};
	if (opts.bio) person.description = opts.bio;
	if (opts.socials) person.sameAs = Object.values(opts.socials).filter(Boolean);
	if (opts.venture) {
		person.worksFor = {
			'@type': 'Organization',
			name: opts.venture.name,
			...(opts.venture.url ? { url: opts.venture.url } : {}),
			...(opts.venture.description ? { description: opts.venture.description } : {})
		};
	}
	return person;
}

/** 文章（Article）JSON-LD。 */
export function articleJsonLd(opts: {
	title: string;
	url: string;
	authorName: string;
	datePublished: string;
}): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: opts.title,
		url: opts.url,
		author: { '@type': 'Person', name: opts.authorName },
		datePublished: opts.datePublished
	};
}

/** 將物件轉為可直接放入 <script> 的字串（已防 </script> 注入）。 */
export function jsonLdScript(data: Json): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
