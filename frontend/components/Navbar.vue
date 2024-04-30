<template>
	<UAccordion :items="router">
		<template #default="{ item, open }">
			<UButton
				color="sky"
				variant="solid"
				class="border-t border-gray-700 w-full"
			>
				<span class="truncate">{{ item.label }}</span>
				<template #trailing>
					<UIcon
						:name="
							open
								? 'i-heroicons-x-mark-solid'
								: 'i-heroicons-bars-3-20-solid'
						"
						class="w-5 h-5 ms-auto transform transition-transform duration-200"
					/>
				</template>
			</UButton>
		</template>
		<template #navbar>
			<div
				class="flex justify-between px-10 bg-sky-700 -mt-1 rounded-b-md py-1"
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
