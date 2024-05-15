<template>
  <div class="flex-1 py-6">
    <d
        role="alert"
      >
        <div v-html="error.message"></div>
        <span
          @click="error.status = false"
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
      <div>
        <h1 class="block text-2xl font-medium text-gray-700">
          Create Classroom
        </h1>
      </div>
      <div class="pt-5">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Enter Classroom Name</label
        >
        <div class="mt-1">
          <input
            type="text"
            v-model="name"
            class="
              block
              w-full
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Enter name"
          />
        </div>
      </div>
      <div class="mt-3">
        <label
          for="exampleFormControlTextarea1"
          class="form-label inline-block mb-2 text-gray-700"
          >Enter Classroom Description</label
        >
        <textarea
          v-model="description"
          class="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700
            focus:bg-white
            focus:border-blue-600
            focus:outline-none
          "
          rows="3"
          placeholder="Description"
        ></textarea>
      </div>

      <div class="mt-4">
        <button
          @click="createClass"
          type="button"
          class="
            inline-flex
            items-center
            rounded-md
            border border-transparent
            bg-indigo-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            shadow-sm
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          <button v-if="loading" disabled class="cursor-not-allowed ...">
            loading ...
          </button>
          <span v-else>Create</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Alert from "../components/Alert.vue";
export default {
  name: "CreateClassroomView",
  components: {
    Alert,
  },
  data() {
    return {
      loading: false,
      name: "",
      description: "",
      error: {
        status: false,
        message: "",
      },
    };
  },
  methods: {
    createClass() {
      this.loading = true;
      console.log(this.$store.state.userData.token);
      console.log(this.name, this.description);
      axios
        .post(
          process.env.VUE_APP_SERVER + "classroom",
          {
            name: this.name,
            description: this.description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${this.$store.state.userData.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$store.commit("setAlertValue", true);
          this.loading = false;
        })
        .catch((error) => {
          error = error.response.data;
          this.error.message = "";

          if (typeof error.errors !== "undefined") {
            const errors = error.errors;
            Object.keys(errors).forEach((errorKey) => {
              errors[errorKey].forEach((errVal) => {
                this.error.message +=
                  '<p className="block sm">' + errVal + "</p>";
              });
            });
          } else if (typeof error.message !== "undefined") {
            this.error.message =
              '<p className="block sm">' + error.message + "</p>";
          }

          this.error.status = true;
          this.loading = false;
        });
    },
  },
};
</script>