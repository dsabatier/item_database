<template>
    <div class="border rounded p-3 bg-light">
        <h3 class="text-secondary">find item</h3>
        <div class="row my-2">
            <div class="input-group col-12">
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
        <div class="row">
            <div class="input-group col-2">
                <select class="custom-select" id="isMagic" v-model="input.magic">
                    <option value="0" selected>Could Be</option>
                    <option value="1">Must Be</option>
                    <option value="2">Must Not Be</option>
                </select>
                <div class="input-group-append">
                    <label class="input-group-text" for="isMagic">Magic</label>
                </div>
            </div>
        </div>
        <div>
        <label for="exampleFormControlSelect1">Resistances</label>
            <select multiple class="form-control" id="exampleFormControlSelect1">
                <option>Piercing</option>
                <option>Blugeoning</option>
                <option>Slashing</option>
            </select>
        </div>
        <!-- <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="hasResistancesCheck" arial-label="Checkbox Resistances" v-model="input.hasResistances" />
            <label for="hasResistancesCheck">
                Resistances
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="isArmor" arial-label="Checkbox Armor" v-model="input.isArmor" />
            <label for="isArmor">
                Armor
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="isEquipableCheck" arial-label="Checkbox Equipable" v-model="input.isEquipable" />
            <label for="isEquipableCheck">
                Equipable
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="isCursedCheck" arial-label="Checkbox Cursed" v-model="input.isCursed" />
            <label for="isCursedCheck">
                Cursed
            </label>
        </div> -->
    </div>
</template>

<script>
import { Rarities } from "../../collections/rarities.js";
export default {
    props: {
        sharedState: Object
    },
    data() {
        return {
            input:
                {
                    name: '',
                    rarity: -1,
                    compare: '',
                    value: 0,
                    magic: "0",
                    resistances: 0
                }
            }
    },
    methods: {
        handleSearchPressed() {
            const newQuery = {
                $or: [],
                $and: []
            };
            // const newQuery = {
            //     "weapon.damageType": "Piercing",
            //     "weapon.properties": { $in: ["Martial"] }
            // };

            const rarity = this.rarities.find(q => q.index == this.input.rarity);
            if(rarity)
                newQuery.$or.push({ rarity: this.input.rarity });

            if(this.input.compare != "")
                newQuery.$and.push({ value: { [this.input.compare]: parseInt(this.input.value) * 100 } });

            // magic
            if(this.input.magic == 1)
                newQuery.$and.push({ magic: { $exists: true }});

            if(this.input.magic == 2)
                newQuery.$and.push({ magic: { $exists: false }})

            // resistances
            if(this.input.hasResistances)
                newQuery.$or.push({ resistances: { $exists: true }});

            if(this.input.isArmor)
                newQuery.$or.push({ armor: { $exists: true }});

            if(this.input.isEquipable)
                newQuery.$or.push({ equipable: { $exists: true }});

            if(this.input.isCursed)
                newQuery.$or.push({ cursed: { $exists: true }});

            if(newQuery.$or.length <= 0)
                delete newQuery.$or;

            if(newQuery.$and.length <= 0)
                delete newQuery.$and;

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
    },
    meteor: {
        rarities: function() {
            return Rarities.find({}).fetch();
        }
    }
}
</script>