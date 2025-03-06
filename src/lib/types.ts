import { ReactNode } from "react";

export interface NavLinkProps {
    href: string;
    children: ReactNode;
}

export interface MealItemProps {
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
  }

export interface Meal {
    id: string;
    name: string;
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
    creator_email: string;
    instructions: string;
}

export interface MealGridProps {
    meals: Meal[];
}

export interface NewMealFromUser {
    title: string;
    summary: string;
    instructions: string;
    image: File;
    creator: string;
    creator_email: string;
    slug?: string;
}