<template>
    <div class="border rounded p-3 m-3 bg-light">
        <h4 class="text-secondary">add item</h4>
        <div class="input-group">
            <div class="mr-2">
                <input type="text" name="name" id="name" class="form-control" placeholder="Item Name..." v-model="newItemInput.name" />
            </div>
            <div class="mr-2">
                <select name="rarity" id="rarity" class="custom-select" placeholder="Select Rarity..."  v-model="newItemInput.rarity">
                    <option selected :value="-1">Select Rarity...</option>
                    <option v-for="rarity in rarities" v-bind:key="rarity.index" :value="rarity.index">{{ rarity.name }}</option>
                </select>
            </div>
            <div class="mr-4">
                <div class="input-group">
                    <input type="number" name="gold-value" id="gold-value" class="form-control" placeholder="0"  v-model="newItemInput.value"/>
                    <div class="input-group-append">
                        <span class="input-group-text">GP</span>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn btn-primary" v-on:click="handleAddItemPressed">Add Item</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Items } from "../api/items.js";

export default {
    methods: 
    {
        handleAddItemPressed() {
            this.errors = [];

            // validate form
            if(!this.newItemInput.name)
                this.errors.push("Name is required");
            
            if(this.newItemInput.value <= 0)
                this.errors.push("Item Value is invalid");
            
            if(isNaN(this.newItemInput.rarity))
                this.errors.push("Not a number");

            if(this.newItemInput.rarity < 0)
            this.errors.push("Rarity is invalid")

            
            if(this.errors.length > 0)
            {
                console.warn(this.errors);
                console.log(this.newItemInput);
                return;
            }

            const newItem = {
                name: this.newItemInput.name,
                rarity: this.newItemInput.rarity,
                value: parseInt(this.newItemInput.value),
            };

            // const newItem = {
            //     name: "Crossbow +3",
            //     rarity: 3,
            //     value: 1000,
            //     weapon: {
            //         damageType: 'Piercing',
            //         properties: ['Large', 'Ranged', 'Martial'],
            //         modifiers: {
            //             attack: 3,
            //             damage: 3
            //         },
            //         range: {
            //             min: 30,
            //             max: 120
            //         },
            //         weight: 3
            //     }
            // };

            Items.insert(newItem);;

            this.newItemInput = {
                name: '',
                rarity: -1,
                value: 0
            }
        },
    },
    data(){
        return {
            newItemInput: {
                name: '',
                rarity: -1,
                value: 0,
            },
            rarities:
            [
                {index: 0, name: "Common"},
                {index: 1, name: "Uncommon"},
                {index: 2, name: "Rare"},
                {index: 3, name: "Very Rare"},
                {index: 4, name: "Legendary"}
            ]
        }
    }
}
</script>