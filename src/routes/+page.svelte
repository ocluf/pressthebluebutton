<script>
	import { browser } from '$app/environment';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { Application } from '@splinetool/runtime';

	if (browser) {
		setup_spline();
	}

	async function setup_spline() {
		const canvas = document.getElementById('canvas3d');
		const app = new Application(canvas);
		await app.load('https://prod.spline.design/m22mMvqC-nem3p3R/scene.splinecode');
		app.addEventListener('mouseUp', (e) => {
			console.log(e);
			fetch('http://localhost:5173/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ button_press: e.target.name === 'blue-button' ? 'blue' : 'red' })
			}).then((res) => {
				invalidateAll();
			});
		});
	}
</script>

<canvas class="block" id="canvas3d"></canvas>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		height: 100vh;
	}

	canvas {
		width: 100%;
		height: 100%;
	}
</style>
