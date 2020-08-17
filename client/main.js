import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';

Vue.use(VueMeteorTracker);
import App from '../imports/ui/App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ItemList from '../imports/ui/ItemList';
import AddItem from '../imports/ui/AddItem';
import FindItem from '../imports/ui/FindItem';
import ThreeRadioGroup from '../imports/ui/widgets/ThreeRadioGroup';

Vue.component('item-list', ItemList);
Vue.component('add-item', AddItem);
Vue.component('find-item', FindItem);
Vue.component('three-radio-group', ThreeRadioGroup);

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App
  });
});