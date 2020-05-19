<template>
<body>
    <h1>action flavorizer<small class="text-muted"> make it tasty</small></h1>
    <!-- this is an app that takes input about a dnd 5e action and turns it into a juicy tidbit:

    example input:
    - dmg type: slashing
    - attack roll: 16
    - target ac: 15
    - damage roll
    - target max hp

    example output:
    "You /swing/attack/lash out/ with your /weapon/"
    "You bring your /weapon/ /up/down/around/ and /slash/swing wildly/"

    "The target /side steps/ducks/twists/" ... "but your /weapon/ connects"
                                            ... "but you strike true"
                                            ... "but they aren't fast enough" -->

</body>
</template>

 
<script>
import Vue from "vue";
import { Items } from "../api/items.js";

export default {
    data() {
        return {
        
        } 
    }
}
</script>