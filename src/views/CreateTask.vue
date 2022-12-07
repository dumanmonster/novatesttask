<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { PAGES } from "../router";
import TaskForm from "../components/TaskForm.vue";
export default {
  components: { TaskForm },
  setup() {
    const router = useRouter();
    const onSuccess = () => {
      router.push(toHomePage.value);
    };

    const toHomePage = computed(() => ({ name: PAGES.HOME }));

    return {
      onSuccess,
      toHomePage,
    };
  },
};
</script>

<template>
  <div class="page">
    <h3>New Task</h3>
    <TaskForm @onSuccess="onSuccess" />

    <div class="fixed-action-btn">
      <router-link :to="toHomePage" class="btn-floating btn-large">
        <i class="large material-icons">format_list_bulleted</i>
      </router-link>
    </div>
  </div>
</template>
