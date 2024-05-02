<script setup lang="ts">
import { navigateTo } from "#imports";
// In pages/ or components/ or layouts/
// How to use composables and get state?
import useMyState from "../../composables/states";
let counter = useMyState();
watch(counter, () => {
	console.log(counter.value);
});
// How to use stores?
const website = useWebsiteStore();
await callOnce(website.fetch);
console.log(website.data);
useSeoMeta({
	title: "Test 2"
});
</script>

<template>
	<div class="flex justify-center">
		<div class="mt-10 w-fit">
			<UCard>
				<template #header>
					<h2 class="text-green-600">Counter</h2>
				</template>
				<UButtonGroup size="xl" class="flex justify-items-center">
					<UButton
						class="w-1/3 text-3xl text-center"
						@click="counter++"
						>+</UButton
					>
					<UButton class="w-1/3 text-3xl text-center">{{
						counter
					}}</UButton>
					<UButton
						class="w-1/3 text-3xl text-center"
						@click="counter--"
						>-</UButton
					>
				</UButtonGroup>
			</UCard>
		</div>
	</div>
	<div class="flex justify-center">
		<div class="mt-10 w-fit">
			<UCard>
				<template #header>
					<UButtonGroup class="flex space-x-10 justify-items-center">
						<UAvatar src="https://pinia.vuejs.org/logo.svg" />
						<UBadge
							class="ml-10"
							color="yellow"
							variant="outline"
							size="lg"
							>Name: {{ website.data.name }}</UBadge
						>
					</UButtonGroup>
				</template>
				Website:
				<ULink
					to="https://pinia.vuejs.org/"
					class="text-primary hover:underline"
				>
					{{ website.data.website }}</ULink
				>
				<div class="w-full">
					description: {{ website.data.description }}
				</div>
				<template #footer>
					<div class="flex w-full space-x-2 justify-items-center">
						<UButton
							varient="link"
							class="flex flex-row justify-center w-1/2"
							color="white"
							@click="
								navigateTo(
									'https://www.npmjs.com/package/' +
										website.data.npm,
									{ external: true }
								)
							"
						>
							<div>
								<div>NPM:</div>
								<ULink
									class="hover:underline text-primary"
									:to="
										'https://www.npmjs.com/package/' +
										website.data.npm
									"
								>
									{{ website.data.npm }}
								</ULink>
							</div>
						</UButton>

						<UButton
							class="flex justify-center w-1/2"
							color="white"
							@click="
								navigateTo(website.data.github, {
									external: true
								})
							"
						>
							<ULink
								:to="website.data.github"
								class="flex flex-row space-x-3 hover:underline text-primary"
							>
								<Icon
									name="mdi:github"
									color="white"
									size="25px"
								/>
								<div>Pinia</div>
							</ULink>
						</UButton>
					</div>
				</template>
			</UCard>
		</div>
	</div>
</template>
