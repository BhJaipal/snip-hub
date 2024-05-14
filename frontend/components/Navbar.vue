<template>
	<UAccordion :items="router">
		<template #default="{ item, open }">
			<UButton
				color="blue"
				variant="solid"
				class="border-t border-gray-700 w-full flex flex-row"
				:ui="NavbarBtnUI"
			>
				<div class="w-20">{{ item.label }}</div>
				<template #trailing>
					<div class="flex justify-end w-full">
						<div class="w-fit gap-5 flex pr-2">
							<UToggle
								on-icon="i-heroicons-sun"
								off-icon="i-heroicons-moon"
								v-model="mode"
								size="lg"
								:ui="toggleUI"
							/>
							<Icon
								:name="
									open
										? 'i-heroicons-x-mark-solid'
										: 'i-heroicons-bars-3-20-solid'
								"
								class="text-sky-500 font-bold w-5 h-5 ms-auto transform transition-transform duration-200"
							/>
						</div>
					</div>
				</template>
			</UButton>
		</template>
		<template #navbar>
			<div
				class="flex justify-between px-10 bg-orange-900/50 dark:bg-blue-900/50 -mt-1 rounded-b-md py-1"
			>
				<template v-for="(item, i) in navigation" :key="i">
					<UButton
						color="blue"
						variant="soft"
						:to="item.to"
						:label="item.label"
						class="w-fit px-5"
					></UButton>
				</template>
			</div>
		</template>
	</UAccordion>
</template>

<script lang="ts" setup>
let mode = ref(false);
watch(mode, () => {
	if (!mode.value) {
	} else {
	}
});
let toggleUI = {
	active: "bg-orange-800 dark:bg-blue-800",
	inactive: "bg-gray-800 dark:bg-gray-800",
	icon: {
		on: "text-orange-500 dark:text-blue-500",
		off: "text-gray-500 dark:text-gray-500"
	}
};
let NavbarBtnUI = {
	color: {
		blue: {
			solid: "bg-blue-900/90 hover:bg-blue-900/75 text-sky-500 font-bold"
		}
	}
};
let navigation = ref<{ label: string; to: string }[]>([
	{ label: "Home", to: "/" },
	{ label: "About", to: "/about" },
	{ label: "Create", to: "/create" },
	{ label: "Form", to: "/form" },
	{ label: "Test page", to: "/test" },
	{ label: "Test 2 page", to: "/test2" }
]);
let router = [{ label: "Snip Hub", slot: "navbar" }];
</script>
