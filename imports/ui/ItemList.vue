<template>
    <table class="table table-hover">
        <thead class="thead-light">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Rarity</th>
                <th scope="col">Magic</th>
                <th scope="col">Gold Value</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody v-if="items.length > 0">
            <tr v-for="(item, index) in items" v-bind:key="index">
                <td scope="col">{{ item.name }}</td>
                <td scope="col">{{ getRarityName(item.rarity) }}</td>
                <td scope="col">{{ getMagicString(item.magic) }}</td>
                <td scope="col">{{ item.value / 100 }}</td>
                <td scope="col"><button class="btn btn-danger" v-on:click="handleDeleteItemPressed(item)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { Rarities } from "../../collections/rarities.js";
export default {
    methods: {
        getRarityName: function(index) {
            if(this.rarities)
            {
                const rarity = this.rarities.find(r => r.index == index);

                if(rarity)
                    return rarity.name;
            }
            else
            {
                return "Unknown";
            }
        },
        getMagicString: function(magic)
        {
            if(magic == undefined)
                return "No";
            
            return "Yes";
        }

    },
    props: {
        items: Array,
        handleDeleteItemPressed: Function,
    },
    meteor: {
        rarities: function() {
            return Rarities.find({}).fetch();
        }
    }
    
}

</script>