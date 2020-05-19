<template>
<body>
    <h1>item management</h1>
    <add-item />
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">item database</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">manage items</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">manage properties</a>
                </li>
            </ul>
        </div>
    </nav> -->

    <find-item :sharedState="sharedState"/>

    <h1>item database<small class="text-muted"> a simple item database</small></h1>


    <item-list :items="items" :handleDeleteItemPressed="handleDeleteItemPressed"/>

</body>
</template>

 
<script>
import Vue from "vue";
import { Items } from "../api/items.js";

export default {
  data() {
      return {
        sharedState:
        {
            query: {}
        },
        errors: [],
        rarities:
        [
            {index: 0, name: "Common"},
            {index: 1, name: "Uncommon"},
            {index: 2, name: "Rare"},
            {index: 3, name: "Very Rare"},
            {index: 4, name: "Legendary"}
        ],
        max_id: 5,
        searchInput:
        {
            name: '',
            rarity: -1,
            compare: '',
            value: 0
        },
      }
  },
  methods: {
    handleDeleteItemPressed(item) {
       Items.remove(item._id);
    }
  },
  meteor: {
      items: function() {
          return Items.find(this.sharedState.query).fetch();
      }
  }
};
</script>