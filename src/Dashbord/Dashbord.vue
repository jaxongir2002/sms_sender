<template>
    <div class="p-3 card_dashbord">

        <div class="grid grid-cols-2 m-2 gap-6 ">
            <div class="card p-4 col-span-1 bg-white rounded-md shadow-xl">
                <Editor v-model="value" editorStyle="height: 320px" />

                <div class="card_file  flex justify-between">
                    <Toast />
                    <input type="file" ref="fileInput" id="file" />
                    <button class="border  rounded-md btn_bg" @click="postFile">
                        Post sms
                    </button>
                    <div class="card_spiner flex justify-content-center" v-if="showSpinner">
                        <ProgressSpinner />
                    </div>
                </div>
            </div>
            <Table class="col-span-1 overflow-scroll rounded-md bg-white p-4 shadow-xl" />
            <div>


                <Dialog v-model:visible="visible" modal  header="Buffer" :style="{ width: '50vw' }">
                    <p class="font-bold  font-serif">
                        <Textarea v-model="valueText" autoResize disabled  rows="5" cols="30" class="w-full" />
                    </p>
                </Dialog>
            </div>
        </div>


    </div>
</template>
  
<script setup>
import { ref } from "vue";
import Editor from "primevue/editor";
import Table from "./Components/Table.vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import Axios from "axios";
import base from "../resubles/base";
import { itemsDate } from '../store/store.js'
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';


const visible = ref(false);
const toast = useToast();
const uID = ref(null)
const store = itemsDate()
const value = ref(`Дорогой ${store.items}, я должен тебе очень много {{баланс}}`);

const showSpinner = ref(false);
const buferDate = ref('');
const valueText = ref('');

const postFile = () => {
    const formData = new FormData();

    const imagefile = document.querySelector('#file');
    formData.append("file", imagefile.files[0]);

    formData.append("text", value.value);

    Axios.post(`${base}/api/action/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("token"),
        },
    })
        .then((response) => {
            uID.value = response.data.session_id
            visible.value = true;
            toast.add({
                severity: "info",
                summary: "Success",
                detail: "File Uploaded",
                life: 3000,
            });
        })
        .catch((err) => {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Failed to upload file",
                life: 3000,
            });
        });


    const refreshIntervalId = setInterval(() => {
        showSpinner.value = true;
        Axios.get(`${base}/api/buffer/${uID.value}/`, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
        }
        ).then((response) => {
            console.log(response.data);
            valueText.value = response.data.buffer


            stingBufer = buferDate.value.join(",");

            if (response.data.finished == true) {
                clearInterval(refreshIntervalId);
                showSpinner.value = false;


            }
        }).catch((error) => {
            if (error) {
                clearInterval(refreshIntervalId);
                showSpinner.value = false;

            }
        });
    }, 200)


};
</script>
<style lang="scss" scoped>
.card_dashbord {
    background-color: rgba(145, 130, 130, 0.157);
    height: 100vh;
}

.card_file {

    border-radius: 10px;
    margin-bottom: 1rem;
    margin-top: 10px;
   
}

::v-deep .p-fileupload .p-fileupload-buttonbar {
    background: #f8f9fa;
    padding: 1.25rem;
    border: 1px solid #dee2e6;
    color: #343a40;
    border-bottom: 0 none;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    gap: 0.5rem;
}

::v-deep .p-fileupload .p-fileupload-content {
    background: #ffffff;
    padding: 2rem 1rem;
    border: 1px solid #dee2e6;
    color: #495057;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
}

::v-deep .ql-toolbar.ql-snow .ql-formats {
    display: none;
}

.btn_bg {
    background-color: rgb(47, 130, 238);
    color: white;
    font-weight: bold;
    width: 50%;
}

.card_spiner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f1f1f14f;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Replace with your desired background color or image */
}
::deep .textarea{
    border: none;
    border-width: none;
}

</style>