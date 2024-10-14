<template>
  <div class="w-[100%] bg-slate-400 flex flex-col items-center justify-center">
    <div class="w-[60%] bg-white p-10 rounded-md">
      <h1>Quản lí công việc</h1>
      <AutoForm
        class="space-y-6"
        :schema="schema"
        :form="form"
        @submit="onSubmit"
      >
        <Button @click="addTask" class="w-[100%]" type="submit">
          {{ isEditing ? "Cập nhật" : "Thêm công việc" }}
        </Button>
      </AutoForm>

      <div
        class="rounded-md flex items-center justify-around mt-10 mb-10 bg-green-200 p-10"
      >
        <Button @click="getAll">Tất cả</Button>
        <Button @click="getComplete">Hoàn thành</Button>
        <Button @click="getIncomplete">Đang thực hiện</Button>
      </div>

      <div class="px-10 py-3 rounded-md text-center bg-sky-300">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="w-[100%] mb-3 rounded-md flex items-center justify-around"
        >
          <div class="flex w-[100%] items-center justify-between">
            <div class="flex items-center gap-3">
              <div v-if="task.status">
                <input checked @click="changeStatus(task.id)" type="checkbox" />
              </div>
              <div v-else>
                <input @click="changeStatus(task.id)" type="checkbox" />
              </div>
              <div v-if="task.status">
                <s>{{ task.name }}</s>
              </div>
              <div v-else>
                <span>{{ task.name }}</span>
              </div>
            </div>
            <div class="flex gap-5">
              <i @click="edit(task)" class="text-yellow-400">
                <font-awesome-icon icon="pen" />
              </i>
              <i @click="del(task.id)" class="text-red-500">
                <font-awesome-icon icon="trash" />
              </i>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button @click="deleteCheckedOnly">Xóa đã chọn</Button>
        <Button @click="deleteAll">Xóa hết</Button>
      </div>
    </div>
    <Toaster />
  </div>
</template>

<script setup>
import * as z from "zod";
import { h, onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { AutoForm } from "@/components/ui/auto-form";
import axios from "axios";

const editTask = ref("");
const isEditing = ref(false);

const schema = z.object({
  name: z.string().min(1).describe("Tên công việc").default(""),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const changeStatus = (id) => {
  getData();
  const task = tasks.value.find((task) => task.id === id);
  console.log(task);

  const updatedTasks = { ...task, status: !task.status };
  console.log(updatedTasks);
  axios.put(`http://localhost:8080/tasks/${updatedTasks.id}`, updatedTasks);
  getData();
};

const tasks = ref([]);

const onSubmit = async (values) => {
  let task = { ...values, status: false };
  console.log(task);

  if (isEditing.value) {
    await axios.put(`http://localhost:8080/tasks/${editTask.value.id}`, task);
    toast({
      title: "Cập nhật thành công",
      description: "Cập nhật công việc thành công",
      variant: "custom",
      className: "bg-green-400 rounded-md p-5 h-[70px] list-none",
    });
    return;
  }
  await axios.post(`http://localhost:8080/tasks`, task);

  getData();
  resetForm();
};

const getData = async () => {
  const res = await axios.get("http://localhost:8080/tasks");
  tasks.value = res.data;
};

const getAll = async () => {
  getData();
};

const deleteCheckedOnly = async () => {
  const checkedTasks = tasks.value.filter((task) => task.status == true);
  const ids = checkedTasks.map((task) => task.id);

  console.log(checkedTasks);

  const confirm = window.confirm(
    "Are you sure you want to delete these tasks?"
  );
  if (!confirm) {
    return;
  }

  for (const key in checkedTasks) {
    console.log(key);
    await axios.delete(`http://localhost:8080/tasks/${checkedTasks[key].id}`);
  }
  getData();
};

const deleteAll = async () => {
  const confirm = window.confirm("Are you sure you want to delete all tasks?");
  if (!confirm) {
    return;
  }
  for (const key in tasks.value) {
    console.log(key);
    await axios.delete(`http://localhost:8080/tasks/${tasks.value[key].id}`);
  }

  toast({
    title: "Thành công",
    description: "Xóa tất cả công việc thành công",
    variant: "destructive",
  });
  getData();
};

const getComplete = async () => {
  const res = await axios.get("http://localhost:8080/tasks?status=true");
  tasks.value = res.data;
};

const getIncomplete = async () => {
  const res = await axios.get("http://localhost:8080/tasks?status=false");
  tasks.value = res.data;
};

const del = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this task?");
  if (!confirm) {
    return;
  }
  await axios.delete(`http://localhost:8080/tasks/${id}`);

  toast({
    title: "Thành công",
    description: "Xóa công việc thành công",
    variant: "destructive",
  });
  getData();
};

const edit = (task) => {
  editTask.value = task;
  isEditing.value = true;

  form.setValues({
    name: task.name,
  });
};

const resetForm = () => {
  editTask.value = "";
  isEditing.value = false;
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
.flex.items-center.gap-3 input[type="checkbox"] {
  margin: 0;
}
.flex.items-center.gap-3 {
  align-items: center;
}
i {
  font-size: 18px;
  cursor: pointer;
}
</style>
