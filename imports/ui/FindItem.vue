<template>
    <div class="border rounded p-3 m-3 bg-light">
        <h4 class="text-secondary">find item</h4>
        <div class="input-group">
            <div class="mr-2">
                <input class="form-control mr-sm-2" type="text" placeholder="Item Name..." aria-label="Name">
            </div>
            <div class="mr-2">
                <select name="rarity" id="rarity" class="custom-select" placeholder="Select Rarity..."  v-model="input.rarity">
                    <option :value="-1" selected>Choose Rarity...</option>
                    <option v-for="rarity in rarities" v-bind:key="rarity.index" v-bind:value="rarity.index">{{ rarity.name }}</option>
                </select>
            </div>
            <div class="mr-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="compare">Gold Value</label>
                    </div>
                    <select class="custom-select" id="compare" v-model="input.compare">
                        <option value="" selected>Choose...</option>
                        <option value="$eq" selected>Equal To</option>
                        <option value="$lt">Less Than</option>
                        <option value="$gt">Greater Than</option>
                    </select>
                    <input class="input-group-append" type="number" :placeholder=0 aria-label="Value" v-model="input.value">
                </div>
            </div>
            <div>
                <button class="btn btn-primary" v-on:click="handleSearchPressed">Search</button>
                <button class="btn btn-outline-primary" v-on:click="handleResetPressed">Reset</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        sharedState: Object
    },
    data() {
        return {
            rarities:
            [
                {index: 0, name: "Common"},
                {index: 1, name: "Uncommon"},
                {index: 2, name: "Rare"},
                {index: 3, name: "Very Rare"},
                {index: 4, name: "Legendary"}
            ],
            input:
                {
                    name: '',
                    rarity: -1,
                    compare: '',
                    value: 0
                }
            }
    },
    methods: {
        handleSearchPressed() {
            const newQuery = {};
            // const newQuery = {
            //     "weapon.damageType": "Piercing",
            //     "weapon.properties": { $in: ["Martial"] }
            // };

            const rarity = this.rarities.find(q => q.index == this.input.rarity);
            if(rarity)
            {
                newQuery.rarity = this.input.rarity;

            }

            if(this.input.compare != "")
            {
                newQuery.value = {}
                newQuery.value[this.input.compare] = parseInt(this.input.value);
            }

            this.sharedState.query = newQuery;
        },
        handleResetPressed() {
            this.input = {
                name: '',
                rarity: -1,
                compare: '',
                value: 0
            }
            this.sharedState.query = {};
        },
    }
}
</script>