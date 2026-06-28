import { getAllPosts, createPost, updatePost, deletePost } from '$lib/server/data-store';
import { logAudit, AUDIT_ACTIONS } from '$lib/server/audit';

export async function load({ locals }) {
	const allPosts = getAllPosts();
	return { allPosts };
}

export const actions = {
	publish: async ({ request, locals }) => {
		if (!locals.user) {
			return { success: false, error: '未登入' };
		}

		const data = await request.formData();
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const isPublished = data.get('isPublished') === 'on';

		if (!title || !content) {
			return { success: false, error: '請填寫標題和內容' };
		}

		const slug = title
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');

		try {
			const post = createPost({
				title,
				content,
				slug,
				type: 'news',
				visibility: 'public',
				published: isPublished,
				createdBy: locals.user.id
			});

			// 記錄審計
			logAudit(locals.user.id, AUDIT_ACTIONS.POST_CREATED, post.id, {
				title,
				published: isPublished
			});

			return { success: true, post };
		} catch (error) {
			return { success: false, error: '發佈失敗' };
		}
	},

	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const postId = data.get('postId') as string;

		if (!postId) {
			return { success: false, error: '缺少文章ID' };
		}

		try {
			deletePost(postId);

			// 記錄審計
			if (locals.user) {
				logAudit(locals.user.id, AUDIT_ACTIONS.POST_DELETED, postId);
			}

			return { success: true };
		} catch (error) {
			return { success: false, error: '刪除失敗' };
		}
	},

	togglePublish: async ({ request, locals }) => {
		const data = await request.formData();
		const postId = data.get('postId') as string;
		const published = data.get('published') === 'true';

		if (!postId) {
			return { success: false, error: '缺少文章ID' };
		}

		try {
			updatePost(postId, { published: !published });

			// 記錄審計
			if (locals.user) {
				logAudit(locals.user.id, published ? AUDIT_ACTIONS.POST_CREATED : AUDIT_ACTIONS.POST_PUBLISHED, postId, {
					published: !published
				});
			}

			return { success: true };
		} catch (error) {
			return { success: false, error: '更新失敗' };
		}
	}
};
