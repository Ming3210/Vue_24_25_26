<script setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import axios from "axios";

// Define the form schema using zod
const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    image: z.string().url("Must be a valid URL").optional(),
    status: z.enum(["active", "inactive"]),
  })
);

const emit = defineEmits(["cancel", "reset"]);

const cancel = (e) => {
  e.preventDefault();
  emit("cancel");
};

// Use a single useForm instance
const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
});

// Hàm xử lý gửi dữ liệu
const onSubmit = handleSubmit(async (values) => {
  const date = new Date().toISOString().split("T")[0];
  const newDate = date.split("-").reverse().join("/");

  values.status = values.status === "active"; // Chuyển đổi trạng thái

  const post = { ...values, date: newDate, block: false };

  // Gửi dữ liệu lên server
  if (props.isEdit) {
    await axios.put(`http://localhost:8080/posts/${props.postEdit.id}`, post);
  } else {
    await axios.post("http://localhost:8080/posts", post);
  }

  emit("reset");
  emit("cancel");
});

// Nhận các props từ component cha
const props = defineProps(["postEdit", "isEdit"]);

// Thiết lập giá trị cho form khi props.postEdit thay đổi
watch(
  () => props.postEdit,
  (newValue) => {
    console.log("postEdit changed:", newValue);
    if (newValue) {
      setValues({
        title: newValue.title,
        image: newValue.image,
        status: newValue.status ? "active" : "inactive",
      });
    } else {
      setValues({
        title: "",
        image: "",
        status: "",
      });
    }
  }
);
</script>

<template>
  <div class="bg-white w-[400px] p-10">
    <form class="w-2/3 space-y-4" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>
            <h1 v-if="props.isEdit">Edit</h1>
            <h1 v-else>Add</h1>
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter post title"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="image">
        <FormItem>
          <FormLabel>Image URL</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter image URL"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="status">
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <select v-bind="componentField">
              <option value="">Select a status</option>
              <option value="active">Đã xuất bản</option>
              <option value="inactive">Ngưng xuất bản</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit">Submit</Button>
      <Button @click="cancel" type="button">Cancel</Button>
    </form>
  </div>
</template>

<style scoped>
/* Optional: Add any additional styles here */
</style>
