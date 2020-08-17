<template>
    <div>
        <div class="form-check form-check-inline group-label">
            <label class="form-check-label">{{groupName}}</label>
        </div>
        <div class="form-check form-check-inline" v-for="(value, index) in values" :key="index">
            <input @change="handleChange" class="form-check-input" type="radio" :name="groupName" :id="groupName" :value=value :checked="index === 0">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        groupName: String,
        values: Array,
        onChange: Function
    },
    methods: {
        handleChange: function(evt)
        {
            this.onChange({ group: this.groupName, value: evt.target.value });
        }
    }
}
</script>

<style scoped>
.group-label {
    width: 150px;
}
</style>