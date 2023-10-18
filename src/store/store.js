import { defineStore } from 'pinia'
import { ref } from 'vue'

export const itemsDate = defineStore('itemsDate', () => {
    const items = ref('{{ name }}')
    return {
        items
    }

})