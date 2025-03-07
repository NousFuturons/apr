// client/src/components/HelloWorld.vue
<template>
  <v-container>
    <h1>{{ message }}</h1>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Chargement...',
    };
  },
  mounted() {
    axios.get('http://localhost:5001') // Remplacez par l'URL de votre backend
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error('Erreur lors de la requête vers le backend:', error);
        this.message = 'Erreur de chargement.';
      });
  },
};
</script>