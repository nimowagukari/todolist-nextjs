"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import { fetchRandom } from "./ServerComponents";

export function ShortlyComponent() {
  return <div>即描画</div>;
}

export function SlowComponent({ initialNum }: { initialNum: number }) {
  const [num, setNum] = useState<number | Promise<number>>(initialNum);

  const handleClick = () => {
    setNum(fetchRandom());
  };

  return (
    <Button variant="text" onClick={handleClick}>
      Number: {num}
    </Button>
  );
}
