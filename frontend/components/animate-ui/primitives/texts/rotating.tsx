"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { getStrictContext } from "@/lib/get-strict-context";
import {
  Slot,
  type WithAsChild,
} from "@/components/animate-ui/primitives/animate/slot";

type RotatingTextContextType = {
  text: string;
};

const [RotatingTextProvider, useRotatingText] =
  getStrictContext<RotatingTextContextType>("RotatingTextContext");

type RotatingTextContainerProps = WithAsChild<
  {
    text: string;
  } & HTMLMotionProps<"div">
>;

const RotatingTextContainer = ({
  text,
  asChild = false,
  ...props
}: RotatingTextContainerProps) => {
  const Component = asChild ? Slot : motion.div;

  return (
    <RotatingTextProvider value={{ text }}>
      <Component {...props} />
    </RotatingTextProvider>
  );
};

type RotatingTextProps = HTMLMotionProps<"span">;

const RotatingText = ({ ...props }: RotatingTextProps) => {
  const { text } = useRotatingText();

  return (
    <motion.span
      key={text}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {text}
    </motion.span>
  );
};

export { RotatingText, RotatingTextContainer };
