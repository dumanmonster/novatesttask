<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ACTIONS } from "../store";
import { PAGES } from "../router";

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const { dispatch } = useStore();

    const toEditTaskPage = (id) => {
      router.push({
        name: PAGES.EDIT,
        params: { id },
      });
    };

    const toggleTaskClosed = (id) => {
      dispatch(ACTIONS.TOGGLE_CLOSED, id);
    };

    const removeTask = (id) => {
      dispatch(ACTIONS.REMOVE_TASK, id);
    };

    return {
      toggleTaskClosed,
      toEditTaskPage,
      removeTask,
    };
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Due Date</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="{ 'task--closed': task.closed }"
        v-for="task in tasks"
        :key="task.id"
      >
        <td>{{ task.title }}</td>
        <td>{{ task.date }}</td>
        <td>
          <div v-if="task.tags.length" class="chips-container">
            <div class="chip" v-for="(tag, i) in task.tags" :key="i">
              {{ tag }}
            </div>
          </div>
          <small v-else>No tags</small>
        </td>
        <td>
          <i @click="toEditTaskPage(task.id)" class="material-icons"> edit </i>
          <i @click="removeTask(task.id)" class="material-icons">delete</i>
          <label>
            <input
              @change="toggleTaskClosed(task.id)"
              type="checkbox"
              class="filled-in"
              :checked="task.closed"
            />
            <span></span>
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
tbody td:last-child {
  text-align: right;
}
i {
  cursor: pointer;
  margin-right: 15px;
}
label {
  position: relative;
  top: 3px;
}
.task--closed {
  text-decoration: line-through;
}
</style>
