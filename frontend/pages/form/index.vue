<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
interface Person {
	name: string;
	age: number;
	gender: "male" | "female";
	children?: Person[];
}
interface Male extends Person {
	gender: "male";
}
interface Female extends Person {
	gender: "female";
}
type Schema = Male | Female;
let data = reactive<Schema>({ name: "", age: 0, gender: "male" });

const submit = (event: FormSubmitEvent<Schema>) => {
	console.log(event.data);
	console.log(data);
};
const validate = (state: Schema): FormError[] => {
	const errors = [];
	if (!state.name) errors.push({ path: "name", message: "Required" });
	if (state.age <= 0) errors.push({ path: "age", message: "Invalid age" });
	return errors;
};
</script>
<template>
	<h1>Form</h1>
	<UForm :state="data" :validate="validate" @submit="submit">
		<UFormGroup label="Name" name="name">
			<UInput v-model="data.name" />
		</UFormGroup>
		<UFormGroup label="Age" name="age">
			<UInput type="number" v-model="data.age" />
		</UFormGroup>
		<UFormGroup label="Gender" name="gender">
			<USelectMenu
				placeholder="Select gender"
				:model-value="data.gender"
				:options="['male', 'female']"
			/>
		</UFormGroup>
		<UButton type="submit">Submit</UButton>
	</UForm>
</template>