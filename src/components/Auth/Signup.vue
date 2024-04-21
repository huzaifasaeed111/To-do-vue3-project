<template>
  <v-container class="w-50">
    <v-row>
      <v-col>
        <h3 class="text-teal text-center">ToDo Application</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs12 sm8 md lg4>
        <v-card class="elevation-12">
          <!-- Title for signup form -->
          <v-card-title class="bg-teal">
            SignUp Form
          </v-card-title>
          <v-card-text>
            <!-- Form for Signup -->
            <v-form @submit.prevent="handleSignup">
              <v-alert
                :value="err.length > 0"
                color="red darken-1"
                class="mt-2"
                v-if="err.length"
              >
                <template v-for="(error, index) in err" :key="index">
                  <p class="mb-1" color="white">{{ error }}</p>
                </template>
              </v-alert>
              <v-text-field
                class="mt-2"
                name="email"
                label="Email"
                type="email"
                variant="underlined"
                v-model="email"
              ></v-text-field>
              <!-- form field for signup -->
              <v-text-field
                class="mt-2"
                name="password"
                label="Password"
                type="password"
                variant="underlined"
                v-model="password"
              ></v-text-field>
              <v-text-field
                class="mt-2"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="underlined"
                v-model="password_confirmation"
              ></v-text-field>
              <v-col cols="12" sm="12" md="12" lg="12">
                <!-- signup button for end the data -->
                <v-btn
                  variant="tonal"
                  elevation="2"
                  class="w-100 bg-teal"
                  type="submit"
                >SignUp</v-btn>
              </v-col>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-container class="text-center">
              <!-- Button for redirect to the login form if user want -->
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <p>If you have Account Click here to <RouterLink to="/" class="text-teal">Login</RouterLink></p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const err = ref([]);
const store = useStore();
const router = useRouter();
// This function uses the Signup Endpoint. It also checks whether the user exists or not. If the user exists, it returns an error alert; otherwise, it moves to the login page.
const handleSignup = async () => {
  try {
    const { success, data, error } = await store.dispatch('signup', {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });

    if (success) {
      router.push('/');
    } else {
      err.value = [error.response.data.error];
    }
  } catch (error) {
    console.error('Signup error:', error);
    err.value = [error.message];
  }
}
</script>
