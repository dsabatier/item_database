import { Meteor } from 'meteor/meteor';
import { Items } from '../imports/api/items.js';

Meteor.startup(() => {
  if (Meteor.isServer) {
    //Items.remove({});
  }
});
