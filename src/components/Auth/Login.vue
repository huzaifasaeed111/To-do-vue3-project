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
        <!-- Login form Title -->
         <v-card-title class="bg-teal">
           Login Form
         </v-card-title>
         <v-card-text>
          <!-- login form content that contain input fields and submit button -->
           <v-form @submit.prevent="handleLogin">
            <v-alert
            color="red-darken-1"
            :value="true"
            class="mt-2"
            v-for="(error, index) in err" :key="index"
            >
             <p color="white">{{ error }}</p>
            </v-alert>
               <v-text-field
                 class="mt-2"
                 name="Email"
                 label="Email"
                 type="email"
                 variant="underlined"
                 v-model="email"
               ></v-text-field>
               <v-text-field
                 class="mt-2"
                 name="password"
                 label="Password"
                 type="password"
                 variant="underlined"
                 v-model="password"
               ></v-text-field>
               <v-btn
                 variant="tonal"
                 elevation="2"
                 class="w-100 bg-teal mt-4"
                 type="submit"
               >Login</v-btn>
           </v-form>
         </v-card-text>
         <v-divider></v-divider>
         <v-card-actions>
           <!-- content for redirecting to signup form -->
          <v-container class="text-center">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <p>If you haven't Account Click here to <router-link to="/signup" class="text-teal">Register</router-link></p>
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
  import { onMounted, ref, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const password = ref('');
  const store = useStore();
  const router = useRouter();
  const err = reactive([]);
  // this function used login endpoint, in which email and password data pass to endpoint. 
  const handleLogin = async () => {
    try {
      const { success, error} = await store.dispatch('login', {
        email: email.value,
        password: password.value
      });
      
      if (success) {
        await store.dispatch('fetchTodoItems', success.token);
        // if endpoint provide result true then redirect to the todo page.
        router.push('/todo');
      } else {
        if (error.response.data.error) {
            err.push(error.response.data.error);
        } else if (error.response.data.message) {
            err.push(error.response.data.message);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
</script>
