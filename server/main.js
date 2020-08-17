import { Meteor } from 'meteor/meteor';
import { Items } from '../collections/items.js';
import { Rarities } from '../collections/rarities.js';
import { Resistances } from '../collections/resistances';
Meteor.startup(() => {
    // if (Meteor.isServer) {
    //     Items.remove({}); // clear items

    //     Items.insert({
    //         name: 'Leather Armor',
    //         value: 2000,
    //         armor: ['Medium'],
    //         material: ['Leather'],
    //         rarity: 0,
    //         description: "<table><tr><td> more HTML and item description",
    //         equipable: "Chest"
    //     });

    //     Items.insert({
    //         name: 'Cool Armor',
    //         magic: { armor: 3 },
    //         resistances: ['piercing', 'slashing'],
    //         value: 200000, 
    //         armor: ['Light', 'Medium', 'Heavy'],
    //         material: ['Leather', 'Hide', 'Metal'],
    //         attunement: null,
    //         charges: [{
    //             name: "Fireball",
    //             count: 3,
    //             reset: "Dawn",
    //         }],
    //         activated: "Command Word",
    //         rarity: 1,
    //         cursed: "HTML blob with curse description",
    //         description: "<table><tr><td> more HTML and item description",
    //         equipable: "Chest"
    //     });

    //     Items.insert({
    //         name: "Bag of Holding",
    //         wondrous: null,
    //         rarity: 0,
    //         value: 100000,
    //         description: "HTML blob of bag of holding text"
    //     });

    // Items.insert({
    //     name: "Vorpal Sword",
    //     weapon: [],
    //     rarity: 4,
    //     value: 10000000,
    //     magic: { attack: [3] },
    //     damage: {
    //         dice: ["2d6", "1d8", "1d6"],
    //         type: ["slashing"]
    //     },
    //     attunement: null,
    //     description: "You gain a +3 bonus to attack and damage rolls made with this magic weapon. In addition, the weapon ignores resistance to slashing damage.  When you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, doesn't have or need a head, has legendary actions, or the GM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit.",
    //     versatile: null
    // });

    //     Items.insert({
    //         name: "Belt of Giant Strength",
    //         wondrous: null,
    //         rarity: 2,
    //         description: "HTML table showing each type of giants belt",
    //         magic: { strength: [19, 21, 27, 29] },
    //         value: 500000
    //     });

    //     Rarities.remove({}); // clear rarities
    //     Rarities.rawCollection().insertMany([
    //         {index: 0, name: "Common"},
    //         {index: 1, name: "Uncommon"},
    //         {index: 2, name: "Rare"},
    //         {index: 3, name: "Very Rare"},
    //         {index: 4, name: "Legendary"}
    //     ])

    //     Resistances.remove({});
    //     Resistances.rawCollection().insertMany([
    //         {index: 0, name: "Slashing"},
    //         {index: 1, name: "Piercing"},
    //         {index: 2, name: "Bludgeoning"},
    //         {index: 3, name: "Poison"},
    //         {index: 4, name: "Acid"},
    //         {index: 5, name: "Fire"},
    //         {index: 6, name: "Cold"},
    //         {index: 7, name: "Radiant"},
    //         {index: 8, name: "Necrotic"},
    //         {index: 9, name: "Lightning"},
    //         {index: 10, name: "Thunder"},
    //         {index: 11, name: "Force"},
    //         {index: 12, name: "Psychic"}

    //     ])
    // }
});