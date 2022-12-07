<script>
import { ref } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import uuid from "../utils/uuid";
import { ACTIONS } from "../store";
import Tasks from "../components/Tasks.vue";

export default {
  props: {
    task: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    const { dispatch } = useStore();
    const title = ref(props.task.title || "");
    const date = ref(dayjs(props.task.date).format("YYYY-DD-MM") || "");
    const tag = ref("");
    const tags = ref(new Set(props.task.tags));
    const errors = ref([]);

    const onSubmit = () => {
      errors.value = [];

      if (!title.value) {
        errors.value.push("You do not entered title of task");
      }

      if (!date.value) {
        errors.value.push("You do not entered due date of task");
      }

      if (!errors.value.length) {
        try {
          if (props.task.id) {
            dispatch(ACTIONS.EDIT_TASK, {
              id: props.task.id,
              title: title.value,
              date: dayjs(date.value).format("DD-MM-YYYY"),
              tags: [...tags.value],
            });
          } else {
            dispatch(ACTIONS.ADD_TASK, {
              id: uuid(),
              title: title.value,
              date: dayjs(date.value).format("DD-MM-YYYY"),
              tags: [...tags.value],
            });
          }

          emit("onSuccess");
        } catch (e) {}
      }
    };

    const addTag = () => {
      if (tag.value) {
        tags.value.add(tag.value);
        tag.value = "";
      }
    };

    return {
      addTag,
      onSubmit,
      title,
      date,
      tag,
      tags,
    };
  },
};
</script>
<template>
  <div class="page">
    <h3>Tasks</h3>
    <Tasks :tasks="tasks" v-if="tasks.length" />
    <div v-else>No tasks</div>
    <div class="fixed-action-btn">
      <router-link :to="toCreateTaskPage" class="btn-floating btn-large">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>
