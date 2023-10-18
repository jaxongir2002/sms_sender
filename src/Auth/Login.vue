<template>
    <div class="bag_svg h-screen flex justify-center items-center shadow-lg">
        <div class="relative container bg-white rounded-xl m-auto width p-2.5 drop-shadow-lg shadow-xl">
            <img src="../assets/Vector.png" alt="" class="m-auto mt-16">
            <h1 class="text-5xl font-medium text-center mt-3 color_login">
                Login
            </h1>
            <div class="mt-14 p-5 m-auto width_75">

                <div class=" m-auto">
                    <div class="relative">
                        <input type="text" id="floating_filled1"
                            class="block  px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 color_border peer"
                            placeholder=" " v-model="login" />

                        <label for="floating_filled1"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 color_border peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">User
                            Name</label>
                    </div>
                </div>

                
                <div class="mt-6 m-auto ">
                    <div class="relative">
                        <input type="password" id="floating_filled" v-model="password"
                            class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 color_border peer"
                            placeholder=" " />
                        <label for="floating_filled"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 color_border peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Password</label>
                    </div>
                </div>



                <button class="top1" @click="Request">Login</button>

            </div>
            <Toast />
        </div>

    </div>
</template>

<script setup>
import Axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import base from '../resubles/base.js';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();
let router = useRouter();
let login = ref("");
let password = ref("");

let Request = () => {
    const data = {
        username: login.value,
        password: password.value,
    };

    Axios.post(`${base}/auth/login/`, data)
        .then((response) => {
            console.log(response);

            if (response.data.token) {
                toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });

                localStorage.setItem("token", response.data.token);
                setTimeout(() => {
                    router.push({ path: "/dashboard" });
                }, 500);
            }
        })
        .catch((error) => {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });

        });
};
</script>

<style scoped>
.top1 {
    display: flex;
    height: 48px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin: auto;
    margin-top: 20px;
    gap: 8px;
    align-self: stretch;
    border-radius: 100px;
    background: #00B5D7;
    color: #FFF;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.1px;
}

.color_border:focus {
    border-color: #00B5D7;
    color: #00B5D7;
}

.color_login {
    color: #00B5D7;
    font-family: sans-serif;
    font-weight: 400;
}

.bag_svg {
    background-color: rgba(145, 130, 130, 0.079);

}
.width{
    width: 35% !important;
    height: 60% !important;
}
.width_75{
    width: 90%;
}
</style>