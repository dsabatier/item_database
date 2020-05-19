<template>
    <table class="table table-hover">
        <thead class="thead-light">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Rarity</th>
                <th scope="col">Gold Value</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" v-bind:key="item.id">
                <td scope="col">{{ item.name }}</td>
                <td scope="col">{{ 
                    rarities.find(r => {
                        return r.index == item.rarity;
                    }).name }}
                </td>
                <td scope="col">{{ item.value }}</td>
                <td scope="col"><button class="btn btn-danger" v-on:click="handleDeleteItemPressed(item)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data(){
        return {
            rarities:
            [
                {index: 0, name: "Common"},
                {index: 1, name: "Uncommon"},
                {index: 2, name: "Rare"},
                {index: 3, name: "Very Rare"},
                {index: 4, name: "Legendary"}
            ]
        }
    },
    props: {
        items: Array,
        handleDeleteItemPressed: Function,
    }
    
}
</script>