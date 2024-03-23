<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">{{ name }}</h1>
        <p class="text-gray-600 mb-2">{{ email }}</p>
        <p class="text-gray-600 mb-4">{{ bio }}</p>
        <button @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit
            Profile</button>

        <div v-if="isModalOpen">
            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="modal bg-white rounded-lg overflow-hidden shadow-xl p-4">
                        <form @submit.prevent="updateProfile">
                            <input v-model="updatedProfile.name" type="text" placeholder="Name"
                                class="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500">
                            <input v-model="updatedProfile.email" type="email" placeholder="Email"
                                class="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500">
                            <textarea v-model="updatedProfile.bio" placeholder="Bio"
                                class="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"></textarea>
                            <button type="submit"
                                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</button>
                            <button @click="closeModal"
                                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2">Close</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import profile from '../../data/user.json';

const name = ref(profile[0].name);
const email = ref(profile[0].email);
const bio = ref(profile[0].bio);

const updatedProfile = {
    name: name.value,
    email: email.value,
    bio: bio.value
};

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
}

const closeModal = () => {
    isModalOpen.value = false;
}

const updateProfile = () => {
    name.value = updatedProfile.name;
    email.value = updatedProfile.email;
    bio.value = updatedProfile.bio;
    isModalOpen.value = false;
}
</script>

<style scoped></style>
