<template>
    <v-container id="dashboard" fluid tag="section">
        <br />
        <v-row>
            <v-col cols="12" lg="4">
                <contenedor-card 
                     color="#E91E63" >
                     <template v-slot:heading>
            <div> aki era</div>
        </template>
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info">
                                        mdi-refresh
                                    </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Website Views
                    </h4>

                    <p class="d-inline-flex font-weight-light ml-2 mt-1">
                        Last Campaign Performance
                    </p>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
                    </template>
                </contenedor-card>
            </v-col>

            <v-col cols="12" lg="4">
                <contenedor-card :data="dailySalesChart.data" :options="dailySalesChart.options" color="success"
                    icon="mdi-calendar-check" type="Line" title="pruebas" >


                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info">
                                        mdi-refresh
                                    </v-icon>
                                </v-btn>

                            </template>

                            <span>Refrecar</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Cambiar</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        ventas diarioas
                    </h4>



                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
                    </template>
                </contenedor-card>
            </v-col>

            <v-col cols="12" lg="4">

                <contenedor-card :data="dataCompletedTasksChart.data" :options="dataCompletedTasksChart.options"
                    hover-reveal color="info" type="Line">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info">
                                        mdi-refresh
                                    </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h3 class="card-title font-weight-light mt-2 ml-2">
                        Completed Tasks
                    </h3>

                    <p class="d-inline-flex font-weight-light ml-2 mt-1">
                        Last Last Campaign Performance
                    </p>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-clock-outline
                        </v-icon>
                        <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
                    </template>
                </contenedor-card>
            </v-col>






        </v-row>
    </v-container>
</template>
    
<script>
import ContenedorCard from './ContenedorCard.vue'

export default {
    components: { ContenedorCard },
    name: 'DashboardDashboard',

    data() {
        return {
            dailySalesChart: {
                data: {
                    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                    series: [
                        [12, 17, 7, 17, 23, 18, 38],
                    ],
                },
                options: {
                    lineSmooth: null,
                    low: 0,
                    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
            },
            dataCompletedTasksChart: {
                data: {
                    labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                    series: [
                        [230, 750, 450, 300, 280, 240, 200, 190],
                    ],
                },
                options: {
                    lineSmooth: null,
                    low: 0,
                    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
            },
            emailsSubscriptionChart: {
                data: {
                    labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                    series: [
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

                    ],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 1000,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0]
                            },
                        },
                    }],
                ],
            },
            headers: [{
                sortable: false,
                text: 'ID',
                value: 'id',
            },
            {
                sortable: false,
                text: 'Name',
                value: 'name',
            },
            {
                sortable: false,
                text: 'Salary',
                value: 'salary',
                align: 'right',
            },
            {
                sortable: false,
                text: 'Country',
                value: 'country',
                align: 'right',
            },
            {
                sortable: false,
                text: 'City',
                value: 'city',
                align: 'right',
            },
            ],
            items: [{
                id: 1,
                name: 'Dakota Rice',
                country: 'Niger',
                city: 'Oud-Tunrhout',
                salary: '$35,738',
            },
            {
                id: 2,
                name: 'Minerva Hooper',
                country: 'Curaçao',
                city: 'Sinaai-Waas',
                salary: '$23,738',
            },
            {
                id: 3,
                name: 'Sage Rodriguez',
                country: 'Netherlands',
                city: 'Overland Park',
                salary: '$56,142',
            },
            {
                id: 4,
                name: 'Philip Chanley',
                country: 'Korea, South',
                city: 'Gloucester',
                salary: '$38,735',
            },
            {
                id: 5,
                name: 'Doris Greene',
                country: 'Malawi',
                city: 'Feldkirchen in Kārnten',
                salary: '$63,542',
            },
            ],
            tabs: 0,
            tasks: {
                0: [{
                    text: 'Sign contract for "What are conference organizers afraid of?"',
                    value: true,
                },
                {
                    text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
                    value: false,
                },
                {
                    text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                    value: false,
                },
                {
                    text: 'Create 4 Invisible User Experiences you Never Knew About',
                    value: true,
                },
                ],
                1: [{
                    text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                    value: true,
                },
                {
                    text: 'Sign contract for "What are conference organizers afraid of?"',
                    value: false,
                },
                ],
                2: [{
                    text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
                    value: false,
                },
                {
                    text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                    value: true,
                },
                {
                    text: 'Sign contract for "What are conference organizers afraid of?"',
                    value: true,
                },
                ],
            },
            list: {
                0: false,
                1: false,
                2: false,
            },
        }
    },

    methods: {
        complete(index) {
            this.list[index] = !this.list[index]
        },
    },
}
</script>
    