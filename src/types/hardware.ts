import type { CollectionEntry } from "astro:content";

export type HardwareItem = CollectionEntry<"hardware">["data"];

export type HardwareStatus = HardwareItem["status"];
