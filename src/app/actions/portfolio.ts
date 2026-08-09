"use server";

import { supabase, Project, CaseStudy, Design, Experience, Stats } from "@/lib/supabase";

/**
 * Fetches all portfolio projects from Supabase, then sorts them by their displayed number.
 * @returns A promise that resolves to an array of Project objects, or an empty array on failure.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")

    const projects = (data as Project[]) || [];

    const sortedProjects = projects.sort((left, right) => {
      const leftNumber = Number(left.number.match(/\d+/)?.[0] ?? Number.POSITIVE_INFINITY);
      const rightNumber = Number(right.number.match(/\d+/)?.[0] ?? Number.POSITIVE_INFINITY);

      return leftNumber - rightNumber;
    });

    if (error) {
      console.error("Error in getProjects Server Action:", error.message);
      return [];
    }

    return sortedProjects;
  } catch (err) {
    console.error("Unexpected error in getProjects Server Action:", err);
    return [];
  }
}

/**
 * Fetches all portfolio case studies from Supabase, ordered by creation date (newest first).
 * @returns A promise that resolves to an array of CaseStudy objects, or an empty array on failure.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error in getCaseStudies Server Action:", error.message);
      return [];
    }

    return (data as CaseStudy[]) || [];
  } catch (err) {
    console.error("Unexpected error in getCaseStudies Server Action:", err);
    return [];
  }
}

/**
 * Fetches all designs from Supabase, ordered by creation date (newest first).
 * These entries contain Cloudinary image URLs.
 * @returns A promise that resolves to an array of Design objects, or an empty array on failure.
 */
export async function getDesigns(): Promise<Design[]> {
  try {
    const { data, error } = await supabase
      .from("designs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error in getDesigns Server Action:", error.message);
      return [];
    }

    return (data as Design[]) || [];
  } catch (err) {
    console.error("Unexpected error in getDesigns Server Action:", err);
    return [];
  }
}

/**
 * Fetches all career experience entries from Supabase, ordered by creation date (newest first).
 * @returns A promise that resolves to an array of Experience objects, or an empty array on failure.
 */
export async function getExperience(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error in getExperience Server Action:", error.message);
      return [];
    }

    return (data as Experience[]) || [];
  } catch (err) {
    console.error("Unexpected error in getExperience Server Action:", err);
    return [];
  }
}

/**
 * Fetches highlight statistics counters from Supabase.
 * @returns A promise that resolves to an array of Stats objects, or an empty array on failure.
 */
export async function getStats(): Promise<Stats[]> {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("*");

    if (error) {
      console.error("Error in getStats Server Action:", error.message);
      return [];
    }

    return (data as Stats[]) || [];
  } catch (err) {
    console.error("Unexpected error in getStats Server Action:", err);
    return [];
  }
}
