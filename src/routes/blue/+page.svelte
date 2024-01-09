<script>
	import { browser } from '$app/environment';
	import { Application } from '@splinetool/runtime';
	import { json } from '@sveltejs/kit';
	import { tick } from 'svelte';

	let { data } = $props();
	let { totalBlue, totalRed } = $derived(calculateTotalPresses(data.presses_by_country));
	if (browser) {
		setup_spline();
	}

	function calculateTotalPresses(aggregatedCountsArray) {
		let totalBlue = 0;
		let totalRed = 0;

		aggregatedCountsArray.forEach((row) => {
			totalBlue += row.blue;
			totalRed += row.red;
		});

		return { totalBlue, totalRed };
	}

	async function setup_spline() {
		await tick();
		const canvas = document.getElementById('canvas3d');
		const app = new Application(canvas);
		// Calculate the total number of presses
		const totalPresses = totalBlue + totalRed;

		// Calculate the angles for the pie chart
		let angle_blue = totalPresses > 0 ? Math.round((totalBlue / totalPresses) * 360) : 0;
		let angle_red = totalPresses > 0 ? Math.round((totalRed / totalPresses) * 360) : 0;

		// Ensure that if both are 0, they remain 0 instead of both becoming 360
		if (totalBlue === 0 && totalRed === 0) {
			angle_blue = 0;
			angle_red = 0;
		}
		await app.load('https://prod.spline.design/CCqfolr3Hf-K5lcg/scene.splinecode', {
			angle_blue,
			angle_red,
			red_presses: totalRed.toString(),
			blue_presses: totalBlue.toString()
		});
	}
</script>

<main class="p-5 lg:p-10 w-fit mx-auto text-gray-50">
	<div class="max-w-[60ch]">
		<h1 class="text-4xl font-bold">
			Congratulations! you pressed the <span class="text-blue-500">blue</span> button
		</h1>

		<p class="mt-10 text-lg">
			Since you pressed the blue button I can show you some fun statistics! My only request is that
			you keep this information secret, especially for those who pressed the red button. If you want
			to see what screen red button pressors got <a href="/red" class="underline">go here</a>.
		</p>
		<div class="mt-10">
			<h2 class="text-lg font-bold">Total number of presses for the red and blue button</h2>
			<canvas id="canvas3d" class="mt-5 rounded-xl max-w-[60ch] min-h-[400px]"></canvas>
		</div>
		<div class="mt-20">
			<h2 class="text-lg font-bold">Number of presses per country</h2>
			{#each data.presses_by_country as presses}
				<div class="flex space-x-4 mt-10">
					<h3 class="text-lg w-[100px]">{presses.country}</h3>
					<p class="text-lg text-red-500">Red presses: {presses.red}</p>
					<p class="text-lg text-blue-500">Blue presses: {presses.blue}</p>
				</div>
			{/each}
		</div>
	</div>
</main>
