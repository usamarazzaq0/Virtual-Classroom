<template>
  <div class="flex-1 py-6">
    <div class="bg-white px-4">
      <div v-if="this.$store.state.alert === true">
        <A
              block
              w-full
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Enter Quiz Title"
          />
        </div>
      </div>
      <div class="pt-3">
        <label for="marks" class="block text-sm font-medium text-gray-700"
          >Total Marks</label
        >
        <div class="mt-1">
          <input
            type="number"
            v-model="marks"
            class="
              block
              w-full
              rounded-md
              border-gray-300
              shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500
              sm:text-sm
            "
            placeholder="Enter Total Marks"
            required/>
        </div>
      </div>
      <div class="pt-3">
        <select
          v-model="classroomId"
          @change="selectClassroom"
          required
          class="
            mt-3
            block
            w-full
            rounded-md
            border-gray-300
            py-2
            pl-3
            pr-10
            text-base
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500
            sm:text-sm
          "
        >
          <option value="" disabled>Select Classroom</option>
          <option v-for="data in classData" :key="data.id" :value="data.id">
            {{ data.name }}
          </option>
        </select>
      </div>
      <div class="mt-3">
        <label
          for="exampleFormControlTextarea1"
          class="form-label inline-block font-medium mb-2 text-gray-700"
          >Enter Quiz Description</label
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

      <div class="mt-3">
        <div class="flex justify-left">
          <div class="mb-3 w-96">
            <label class="block text-sm font-medium text-gray-700"
              >Upload File</label
            >
            <div
              class="
                mt-1
                flex
                justify-center
                rounded-md
                border-2 border-dashed border-gray-300
                px-6
                pt-5
                pb-6
              "
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="
                      relative
                      cursor-pointer
                      rounded-md
                      bg-white
                      font-medium
                      text-indigo-600
                      focus-within:outline-none
                      focus-within:ring-2
                      focus-within:ring-indigo-500
                      focus-within:ring-offset-2
                      hover:text-indigo-500
                    "
                  >
                    <span>Upload a file</span>
                    <input
                      @change="processFile($event)"
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                <p class="text-xs text-gray-500">{{ document.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <button
          @click="createProject"
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
          <span v-else>Upload Quiz</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Alert from "../components/Alert.vue";
export default {
  name: "CreateProjectView",
  components: {
    Alert,
  },
  data() {
    return {
      loading: false,
      title: "",
      description: "",
      classData: "",
      classroomId: "",
      marks: "",
      document: "",
      error: {
        status: false,
        message: ''
      }
    };
  },
  created() {
    this.index();
  },
  methods: {
    processFile(event) {
      this.document = event.target.files[0];
    },
    index() {
      axios
        .get(process.env.VUE_APP_SERVER + "classroom", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.$store.state.userData.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.classData = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    createProject() {
      this.loading = true;
      axios
        .post(
          process.env.VUE_APP_SERVER +
            "classroom/" +
            this.classroomId +
            "/project",
          {
            name: this.title,
            marks: this.marks,
            description: this.description,
            document: this.document,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
          error = error.response.data
            this.error.message = ''

            if (typeof error.errors !== 'undefined') {
              const errors = error.errors
              Object.keys(errors).forEach((errorKey) => {
                errors[errorKey].forEach((errVal) => {
                  this.error.message += '<p className="block sm">'+errVal+'</p>'
                })
              })
            }
            else if(typeof error.message !== 'undefined')
            {
              this.error.message = '<p className="block sm">'+error.message+'</p>'
            }

            this.error.status = true
            this.loading = false;
        });
    },
  },
};
</script>