<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
        
        <b-row>
            <b-col>
                <b-button :to="{ name: 'offices' }" >lista de oficinas</b-button>
                <b-button :to="{ name: 'office-create' }" >crear oficina</b-button>
            </b-col>
        </b-row>

        </base-header>
        
        <b-container fluid class="mt--6">
            <b-row>
                <b-col cols="12">
                    <router-view></router-view>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
export default {
    name: 'Office'
}
</script>