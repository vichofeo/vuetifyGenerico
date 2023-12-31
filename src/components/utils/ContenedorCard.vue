<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      v-bind="$attrs"
      :class="{ ...classes, 'on-hover': hover }"
      class="v-card--material pa-2"
      :elevation="hover ? 12 : 1"
    >
      <v-expand-transition>
        <div class="d-flex grow flex-wrap">
          <v-avatar
            v-if="avatar"
            size="128"
            class="mx-auto v-card--material __avatar elevation-6"
            color="white"
            
          >
            <v-img :src="avatar" lazy-src="/img/asuss.png">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>

          <v-sheet
            v-else
            :class="{
              'pa-7': !$slots.image,
              __headingOffset: hover && !!$slots['reveal-actions'],
            }"
            rounded
            :color="color"
            :max-height="icon ? 90 : undefined"
            :width="icon ? 'auto' : '100%'"
            elevation="6"
            class="__heading text-start v-card--material mb-n6"
            dark
          >
            <slot v-if="$slots.heading" name="heading" />

            <slot v-else-if="$slots.image" name="image" />

            <div
              v-else-if="title && !icon"
              class="display-1 font-weight-light"
              v-text="title"
            />

            <v-icon v-else-if="icon" size="32" v-text="icon" />

            <div v-if="text" class="headline font-weight-thin" v-text="text" />
          </v-sheet>

          <div v-if="$slots['after-heading']" class="ml-6">
            <slot name="after-heading" />
          </div>

          <div v-else-if="icon && title" class="ml-4">
            <div
              class="card-title font-weight-bold"
              style="color: rgb(29, 98, 161)"
              v-text="title"
            />
          </div>
        </div>
      </v-expand-transition>
      <div v-if="$slots['reveal-actions']" class="__headingActions mb-n10">
        <slot name="reveal-actions" />
      </div>
      <slot />

      <template v-if="$slots.actions">
        <v-divider class="mt-2" />

        <v-card-actions class="pb-0">
          <slot name="actions" />
        </v-card-actions>
      </template>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "ContenedorCard",

  props: {
    avatar: { type: String, default: "" },
    color: { type: String, default: "success" },
    icon: { type: String, default: undefined },
    image: { type: Boolean, default: false },
    text: { type: String, default: "" },
    title: { type: String, default: "" },
    onClick: {
      type: Function,
      default() {
        return null;
      },
    },
  },

  computed: {
    classes() {
      return {
        "v-card--material--has-heading": this.hasHeading,
      };
    },
    hasHeading() {
      return Boolean(this.$slots.heading || this.title || this.icon);
    },
    hasAltHeading() {
      return Boolean(this.$slots.heading || (this.title && this.icon));
    },
  },
};
</script>

<style>
.v-card--material .__avatar {
  position: relative;
  top: -64px;
  margin-bottom: -32px;
}

.__heading {
  position: relative;
  top: -40px;

  z-index: 1;
}
.__headingActions {
  position: relative;
  top: -50px;

  z-index: 0;
}
.__headingOffset {
  position: relative;
  top: 40px;
  transition: 0.3s;
}
</style>
