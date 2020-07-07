<template>
<body>
    <h1>item management</h1>
    <!-- <add-item /> -->
    <find-item :sharedState="sharedState"/>
    <h1>item database<small class="text-muted"> a simple item database</small></h1>
    <item-list :items="items" :handleDeleteItemPressed="handleDeleteItemPressed"/>

</body>
</template>

 
<script>
import Vue from "vue";
import { Items } from "../../collections/items.js";

export default {
  data() {
      return {
        sharedState:
        {
            query: {}
        },
        errors: [],
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