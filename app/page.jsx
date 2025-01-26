"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./components/ui/images-slider";
import Blog from "./components/Blog/Blog";
import Section from "./components/Section/Section";
export default function page() {
  return (
    <>
      <Blog />
      <Section/>
    </>
  );
}
