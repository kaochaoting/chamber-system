// 內存數據存儲（應替換為 D1，目前用於快速開發）

export interface Profile {
	userId: string;
	displayName: string;
	bio: string;
	website?: string;
	isPublic: boolean;
	publicEmail?: string;
	privatePhone?: string;
	avatar?: string;
}

export interface Post {
	id: string;
	title: string;
	slug: string;
	content: string;
	type: 'news' | 'article' | 'thread';
	visibility: 'public' | 'members';
	published: boolean;
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

const profiles = new Map<string, Profile>();
const posts = new Map<string, Post>();

export function getProfile(userId: string): Profile | undefined {
	return profiles.get(userId);
}

export function saveProfile(userId: string, profile: Omit<Profile, 'userId'>): Profile {
	const fullProfile: Profile = { userId, ...profile };
	profiles.set(userId, fullProfile);
	return fullProfile;
}

export function getAllPublicProfiles(): Profile[] {
	return Array.from(profiles.values()).filter(p => p.isPublic);
}

export function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
	const id = Math.random().toString(36).substring(7);
	const fullPost: Post = {
		...post,
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	};
	posts.set(id, fullPost);
	return fullPost;
}

export function getPost(id: string): Post | undefined {
	return posts.get(id);
}

export function getPostBySlug(slug: string): Post | undefined {
	return Array.from(posts.values()).find(p => p.slug === slug);
}

export function getAllPosts(type?: string, visibility?: string): Post[] {
	return Array.from(posts.values())
		.filter(p => {
			if (type && p.type !== type) return false;
			if (visibility && p.visibility !== visibility) return false;
			return p.published;
		})
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function updatePost(id: string, updates: Partial<Post>): Post | undefined {
	const post = posts.get(id);
	if (!post) return undefined;
	const updated = { ...post, ...updates, updatedAt: new Date() };
	posts.set(id, updated);
	return updated;
}

export function deletePost(id: string): boolean {
	return posts.delete(id);
}
