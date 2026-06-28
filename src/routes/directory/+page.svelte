<script lang="ts">
	let selectedCategory = 'all';

	const products = [
		{
			id: '1',
			name: '創新創業諮詢',
			category: 'consulting',
			description: '提供創業初期的策略規劃和市場分析',
			provider: 'Demo User'
		},
		{
			id: '2',
			name: '品牌設計服務',
			category: 'design',
			description: '協助新創企業打造專業的品牌形象',
			provider: 'Demo User'
		}
	];

	const categories = [
		{ id: 'all', name: '全部' },
		{ id: 'consulting', name: '諮詢服務' },
		{ id: 'design', name: '設計' },
		{ id: 'marketing', name: '行銷' },
		{ id: 'tech', name: '技術' }
	];

	$: filtered = selectedCategory === 'all'
		? products
		: products.filter(p => p.category === selectedCategory);
</script>

<div class="container">
	<h1>產品與服務</h1>
	<p class="subtitle">高創坊成員提供的產品與服務</p>

	<div class="filter-section">
		{#each categories as cat (cat.id)}
			<button
				class="filter-btn {selectedCategory === cat.id ? 'active' : ''}"
				on:click={() => (selectedCategory = cat.id)}
			>
				{cat.name}
			</button>
		{/each}
	</div>

	<div class="products-grid">
		{#each filtered as product (product.id)}
			<div class="product-card">
				<h3>{product.name}</h3>
				<p class="category">{categories.find(c => c.id === product.category)?.name}</p>
				<p class="description">{product.description}</p>
				<p class="provider">提供者：{product.provider}</p>
				<button class="contact-btn">聯繫提供者</button>
			</div>
		{:else}
			<p class="empty">此類別暫無服務</p>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	.filter-section {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.filter-btn {
		padding: 0.5rem 1rem;
		border: 1px solid #ddd;
		background: white;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
	}

	.filter-btn:hover {
		border-color: #007bff;
		color: #007bff;
	}

	.filter-btn.active {
		background: #007bff;
		color: white;
		border-color: #007bff;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.product-card {
		background: #f9f9f9;
		padding: 1.5rem;
		border-radius: 8px;
		border: 1px solid #e5e5e5;
		display: flex;
		flex-direction: column;
	}

	.product-card h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.category {
		display: inline-block;
		background: #e7f3ff;
		color: #0056b3;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.85rem;
		margin-bottom: 1rem;
		width: fit-content;
	}

	.description {
		color: #666;
		margin: 1rem 0;
		flex-grow: 1;
	}

	.provider {
		font-size: 0.9rem;
		color: #999;
		margin: 0.5rem 0;
	}

	.contact-btn {
		margin-top: auto;
		padding: 0.5rem 1rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.contact-btn:hover {
		background: #0056b3;
	}

	.empty {
		text-align: center;
		color: #999;
		grid-column: 1 / -1;
	}
</style>
