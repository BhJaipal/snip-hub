<script setup lang="ts">
import type {
	FormError,
	FormSubmitEvent,
	FormErrorEvent
} from "@nuxt/ui/dist/runtime/types";
interface Person {
	name: string;
	age: number;
	gender: "male" | "female";
	children: Child[];
}
interface Child {
	name: string;
	age: number;
	gender: "male" | "female";
}
let data = reactive<Person>({
	name: "",
	age: 0,
	gender: "male",
	children: []
});
let childCount = ref(0);
watch(childCount, () => {
	data.children = [];
	data.children = new Array<Child>(childCount.value).fill({
		name: "",
		age: 0,
		gender: "male"
	});
});
const submitError = (event: FormErrorEvent) => {
	const elem = document.getElementById(event.errors[0].id);
	elem?.focus();
	elem?.scrollIntoView({ behavior: "smooth", block: "center" });
};
const submit = (event: FormSubmitEvent<Person>) => {
	console.log(event.data);
	dataSubmitted.value = true;
};
let dataSubmitted = ref(false);
const validate = (state: Person): FormError[] => {
	const errors = [];
	if (!state.name) errors.push({ path: "name", message: "Required" });
	if (state.age <= 0) errors.push({ path: "age", message: "Invalid age" });
	if (state.age == undefined || state.age < 0 || state.age == null)
		state.age = 0;
	if (childCount.value != state.children?.length)
		errors.push({ path: "kidsCount", message: "Invalid kids count" });
	if (childCount.value < 0)
		errors.push({ path: "kidsCount", message: "Invalid kids count" });
	if (
		childCount.value == undefined ||
		childCount.value < 0 ||
		childCount.value == null
	)
		childCount.value = 0;
	return errors;
};
</script>
<template>
	<div class="flex justify-center mt-5">
		<UCard class="w-1/4">
			<template #header>
				<h3>Form</h3>
			</template>
			<div></div>
			<UForm
				:state="data"
				:validate="validate"
				@submit="submit"
				@error="submitError"
			>
				<UFormGroup label="Name" name="name" class="mb-5">
					<UInput v-model="data.name" />
				</UFormGroup>
				<UFormGroup label="Age" name="age" class="mb-5">
					<UInput type="number" v-model="data.age" />
				</UFormGroup>
				<UFormGroup label="Gender" name="gender" class="mb-5">
					<USelectMenu
						placeholder="Select gender"
						v-model="data.gender"
						:options="['male', 'female']"
					/>
				</UFormGroup>
				<UFormGroup label="Kids count" name="kidsCount" class="mb-5">
					<UInput type="number" v-model="childCount" />
				</UFormGroup>
				<div v-if="childCount > 0" class="grid grid-cols-2 mb-5">
					<template v-for="i in data.children.length" :key="i">
						<UCard>
							<UFormGroup
								:label="`Kid ${i}'s name'`"
								:name="`children.${i - 1}.name`"
								class="mb-5"
							>
								<UInput v-model="data.children[i - 1].name" />
							</UFormGroup>
							<UFormGroup
								:label="`Kid ${i}'s age'`"
								:name="`children.${i - 1}.age`"
								class="mb-5"
							>
								<UInput
									type="number"
									v-model="data.children[i - 1].age"
								/>
							</UFormGroup>
							<UFormGroup
								:label="`Kid ${i}'s gender'`"
								name="gender"
								class="mb-5"
							>
								<USelectMenu
									placeholder="Select gender"
									v-model="data.children[i - 1].gender"
									:options="['male', 'female']"
								/>
							</UFormGroup>
						</UCard>
					</template>
				</div>
				<UButton type="submit">Submit</UButton>
			</UForm>
		</UCard>
	</div>
	<div class="flex justify-center">
		<div v-if="dataSubmitted" class="w-1/4 mt-10">
			<UCard>
				<template #header>
					<h3>Data</h3>
				</template>
				<p>Name: {{ data.name }}</p>
				<p>Age: {{ data.age }}</p>
				<p>Gender: {{ data.gender }}</p>
			</UCard>
		</div>
	</div>
</template>