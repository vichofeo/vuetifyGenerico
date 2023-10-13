<template>
    <div>
        <br />
        <v-hover v-slot="{ hover }">

            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-img :aspect-ratio="16 / 9" src="https://cdn.vuetifyjs.com/images/cards/kitchen.png">
                    <v-expand-transition>
                        <div v-if="hover" class="d-flex 
                        
                        orange darken-2 
                        
                        text-h2 white--text" style="height: 100%;">
                            preciooo
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-card-text class="pt-6" style="position: relative;">
                    <v-btn absolute color="orange" class="white--text" fab large left middle>
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <div class="font-weight-light grey--text text-h6 mb-2">
                        For the perfect meal
                    </div>
                    <h3 class="text-h4 font-weight-light orange--text mb-2">
                        QW cooking utensils
                    </h3>
                    <div class="font-weight-light text-h6 mb-2">
                        Our Vintage kitchen utensils delight any chef.<br>
                        Made of bamboo by hand
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-hover v-slot="{ hover }">
            <v-card class="mt-4 mx-auto" max-width="400">
                <v-expand-transition>
                    <v-sheet 
                    :class="` ${hover? 'd-flex v-sheet--offset2 transition-fast-in-fast-out orange v-card--reveal':'v-sheet--offset'} mx-auto`" 
                    color="cyan" 
                    elevation="12" 
                    max-width="calc(100% - 32px)">
                        <v-sparkline :labels="labels" :value="value" color="white" line-width="2"
                            padding="16"></v-sparkline>
                    </v-sheet>
                </v-expand-transition>
                <v-card-text class="pt-0">
                    <div class="text-h6 font-weight-light mb-2">
                        User Registrations
                    </div>
                    <div class="subheading font-weight-light grey--text">
                        Last Campaign Performance
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <v-icon class="mr-2" small>
                        mdi-clock
                    </v-icon>
                    <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
                </v-card-text>
            </v-card>
        </v-hover>
                </v-card-text>
            </v-card>
        </v-hover>

        
    </div>
</template>
<script>
export default {
    data: () => ({
        labels: [
            '12am',
            '3am',
            '6am',
            '9am',
            '12pm',
            '3pm',
            '6pm',
            '9pm',
        ],
        value: [
            200,
            675,
            410,
            390,
            310,
            460,
            250,
            240,
        ],
    }),
}
</script>
<style>
.v-sheet--offset {
    top: -24px;
    position: relative;
}

.v-sheet--offset2 {
    top: 24px;
    position: relative;
}

.v-card--reveal {
    align-items: center;
    
    justify-content: center;
    opacity: .5;
    
    width: 100%;
}</style>