import { Meteor } from 'meteor/meteor';
import { Items } from '../collections/items.js';
import { Rarities } from '../collections/rarities.js'
Meteor.startup(() => {
    if (Meteor.isServer) {
        // Items.remove({}); // clear items

        // Items.insert({
        //     name: 'Leather Armor',
        //     value: 2000,
        //     armor: ['Medium'],
        //     material: ['Leather'],
        //     rarity: 0,
        //     description: "<table><tr><td> more HTML and item description",
        //     equipable: "Chest"
        // });

        // Items.insert({
        //     name: 'Cool Armor',
        //     magic: { armor: 3 },
        //     resistances: ['piercing', 'slashing'],
        //     value: 200000, 
        //     armor: ['Light', 'Medium', 'Heavy'],
        //     material: ['Leather', 'Hide', 'Metal'],
        //     attunement: null,
        //     charges: [{
        //         name: "Fireball",
        //         count: 3,
        //         reset: "Dawn",
        //     }],
        //     activated: "Command Word",
        //     rarity: 1,
        //     cursed: "HTML blob with curse description",
        //     description: "<table><tr><td> more HTML and item description",
        //     equipable: "Chest"
        // });

        // Items.insert({
        //     name: "Bag of Holding",
        //     wondrous: null,
        //     rarity: 0,
        //     value: 100000,
        //     description: "HTML blob of bag of holding text"
        // });

        // Items.insert({
        //     name: "Belt of Giant Strength",
        //     wondrous: null,
        //     rarity: 2,
        //     description: "HTML table showing each type of giants belt",
        //     magic: { strength: [19, 21, 27, 29] },
        //     value: 500000
        // });

        // Rarities.remove({}); // clear rarities
        // Rarities.rawCollection().insertMany([
        //     {index: 0, name: "Common"},
        //     {index: 1, name: "Uncommon"},
        //     {index: 2, name: "Rare"},
        //     {index: 3, name: "Very Rare"},
        //     {index: 4, name: "Legendary"}
        // ])
    }
});