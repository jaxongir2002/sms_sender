<template>
    <div>

        <div v-for="user in data" class="flex p-ripple justify-between hover_div transition-colors cursor-pointer p-2 m-1  border overflow-auto">
            <div>
                <h2 class="text-black py-2 font-mono font-medium">
                    {{ user.humanlike }}
                </h2>
            </div>
            <div>
                <h3 @click="giveName(user.keyword)">
                    {{ user.keyword }}
                    
                </h3>

            </div>
          
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import Axios from "axios";
import base from "../../resubles/base.js";
import { itemsDate } from '../../store/store.js'


const data = ref([]);
const store = itemsDate()

Axios.get(`${base}/api/placeholders/`, {
    headers: {
        Authorization: "Token " + localStorage.getItem("token"),
    },
})
    .then((response) => {
       
        data.value.push(...response.data);
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
const giveName = (name) => {
    if (name == "balance") {
        localStorage.setItem("balance", name)
    }
    store.items = name
    console.log(name);
};





</script>

<style lang="scss" scoped>
// .hover_div:hover {
//     background-color: rgba(0, 0, 0, 0.729);
//     color: white;
// }

</style>