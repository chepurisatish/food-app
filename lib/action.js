"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text) => {
  return !text || text.trim() === "";
};

export const ShareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    creator: formData.get("name"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invaild input.",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
