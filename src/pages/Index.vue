<template>
  <q-page class="q-pa-md">
    <q-btn
      color="primary"
      :label="counter"
      size="xl"
      class="full-width q-mb-md"
    />
    <div class="row">
      <div class="col">
        <q-btn
          @click="decreaseCounter"
          flat
          round
          color="negative"
          icon="remove"
          size="lg"
        />
      </div>
      <div class="col text-center">
        <q-btn
          @click="resetCounter"
          flat
          round
          icon="restart_alt"
          size="lg"
        />
      </div>
      <div class="col text-right">
        <q-btn
          @click="increaseCounter"
          flat
          round
          color="positive"
          icon="add"
          size="lg"
        />
      </div>
    </div>
    <q-btn
      @click="quitApp"
      class="absolute-bottom-right"
      flat
      round
      icon="power_settings_new"
      size="sm"
    />
  </q-page>
</template>

<script setup>
  import { ref } from 'vue';

  const counter = ref(0)

  function increaseCounter() {
    counter.value++
  }

  function decreaseCounter() {
    counter.value--
  }

  function resetCounter() {
    counter.value = 0
  }

  function quitApp() {
    window.myAPI.quitApp()
  }

</script>
