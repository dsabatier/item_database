<template>
    <div class="border rounded p-3 bg-light">
        <h3 class="text-secondary">find item</h3>
        <div class="row my-2">
            <div class="input-group col-12">
                <div class="mr-2">
                    <label for="itemname">Item Name</label>
                    <input id="itemname" class="form-control mr-sm-2" type="text" aria-label="Name" v-model="input.itemname">
                </div>
                <div class="mr-2">
                    <label for="rarity">Rarity</label>
                    <select name="rarity" id="rarity" class="custom-select" placeholder="Select Rarity..."  v-model="input.rarity">
                        <option :value="-1" selected>Choose Rarity...</option>
                        <option v-for="rarity in rarities" v-bind:key="rarity.index" v-bind:value="rarity.index">{{ rarity.name }}</option>
                    </select>
                </div>
                <div class="mr-4">
                    <label for="compare">Gold Value</label>
                    <div class="input-group">
                        <select class="custom-select" id="compare" v-model="input.compare">
                            <option value="$eq" selected>Equal To</option>
                            <option value="$lt">Less Than</option>
                            <option value="$gt">Greater Than</option>
                        </select>
                        <input class="form-control" aria-label="Value" v-model="input.value">
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-2">
            <div class="border rounded p-3 bg-light col-3">
                <span class="resistances-header"><b>Resistance Type</b></span><span class="resistances-option">*</span><span class="resistances-option">&#x2714;</span><span class="resistances-option">&#x2716;</span>
                <three-radio-group v-for="resistance in resistances" :key="resistance.id" :groupName="resistance.name" :onChange="handleResistanceChanged" :values="[0, 1, 2]"></three-radio-group>
            </div>
            <!-- <div class="border rounded p-3 bg-light col-3">
                <span class="resistances-header"><b>Vulnerability Type</b></span><span class="resistances-option">*</span><span class="resistances-option">&#x2714;</span><span class="resistances-option">&#x2716;</span>
                <three-radio-group v-for="resistance in resistances" :key="resistance.id" :groupName="resistance.name" :onChange="handleResistanceChanged" :values="[0, 1, 2]"></three-radio-group>
            </div>
            <div class="border rounded p-3 bg-light col-3">
                <span class="resistances-header"><b>Immunity Type</b></span><span class="resistances-option">*</span><span class="resistances-option">&#x2714;</span><span class="resistances-option">&#x2716;</span>
                <three-radio-group v-for="resistance in resistances" :key="resistance.id" :groupName="resistance.name" :onChange="handleResistanceChanged" :values="[0, 1, 2]"></three-radio-group>
            </div> -->
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
        <div class="py-4">
            <button class="btn btn-primary" v-on:click="handleSearchPressed">Search</button>
            <button class="btn btn-outline-primary" v-on:click="handleResetPressed">Reset</button>
        </div>
    </div>
</template>

<script>
import { Rarities } from "../../collections/rarities.js";
import { Resistances } from "../../collections/resistances.js";

export default {
    props: {
        sharedState: Object
    },
    data() {
        return {
            input:
                {
                    itemname: '',
                    rarity: -1,
                    compare: "$eq",
                    value: null,
                    magic: "0",
                    resistances: {
                        include: [], 
                        exclude: []
                    }
                }
            }
    },
    methods: {
        handleSearchPressed() {
            const newQuery = {
                $or: [],
                $and: []
            };

            const rarity = this.rarities.find(q => q.index == this.input.rarity);
            if(rarity)
                newQuery.$or.push({ rarity: this.input.rarity });

            if(this.input.compare != "" && this.input.value)
                newQuery.$and.push({ value: { [this.input.compare]: parseInt(this.input.value) * 100 } });

            // magic
            if(this.input.magic == 1)
                newQuery.$and.push({ magic: { $exists: true }});

            if(this.input.magic == 2)
                newQuery.$and.push({ magic: { $exists: false }})

            if(this.input.isArmor)
                newQuery.$or.push({ armor: { $exists: true }});

            if(this.input.isEquipable)
                newQuery.$or.push({ equipable: { $exists: true }});

            if(this.input.isCursed)
                newQuery.$or.push({ cursed: { $exists: true }});

            if(this.input.resistances.include.length > 0)
                newQuery.$and.push({ resistances: { $all: [...this.input.resistances.include]}})

            if(this.input.resistances.exclude.length > 0)
                newQuery.$and.push({ resistances: { $nin: [...this.input.resistances.exclude]}})


            newQuery.$and.push({name: { $regex: this.input.itemname, $options: 'i'}});

            // remove unused query params
            if(newQuery.$or.length <= 0)
                delete newQuery.$or;

            if(newQuery.$and.length <= 0)
                delete newQuery.$and;

            this.sharedState.query = newQuery;
            console.log(this.sharedState.query);
        },
        handleResetPressed() {
            this.input = {
                itemname: '',
                rarity: -1,
                compare: "$eq",
                value: null,
                magic: "0",
                resistances: {
                    include: [], 
                    exclude: []
                },
                vulnerabilities: {
                    include: [], 
                    exclude: []
                },
                immunities: {
                    include: [], 
                    exclude: []
                }
            }
            this.sharedState.query = {};
        },
        handleResistanceChanged(newValue)
        {
            const queryModifier = parseInt(newValue.value);
            const damageType = newValue.group.toLowerCase();
            const typeArray = this.input.resistances;
            this.handleOptionChanged({queryModifier, damageType, typeArray});
        },
        handleOptionChanged(options)
        {
            const { queryModifier, damageType, typeArray } = options;
            if(queryModifier === 0)
            {
                if(typeArray.include.includes(damageType))
                {
                    let index = typeArray.include.indexOf(damageType);
                    if(index > -1)
                    {
                        typeArray.include.splice(index, 1);
                    }

                    index = typeArray.exclude.indexOf(damageType);
                    if(index > -1)
                    {
                        typeArray.exclude.splice(index, 1);
                    }
                }
            }
            else if(queryModifier === 1)
            {
                // BUG: not properly removing when going from exclude to include or any
                typeArray.include.push(damageType);
                let index = typeArray.exclude.indexOf(damageType);
                if(index > -1)
                {
                   typeArray.exclude.splice(index, 1);
                }
            } 
            else if(queryModifier === 2)
            {
                typeArray.exclude.push(damageType);
                let index = typeArray.include.indexOf(damageType);
                if(index > -1)
                {
                    typeArray.include.splice(index, 1);
                }
            }
        }
    },
    meteor: {
        rarities: function() {
            return Rarities.find({}).fetch();
        },
        resistances: function() {
            return Resistances.find({}).fetch();
        }
    }
}
</script>

<style scoped>
.resistances-header
{
    display: inline-block;
    width: 165px;
}

.resistances-option
{
    display: inline-block;
    width: 27px;
}
</style>