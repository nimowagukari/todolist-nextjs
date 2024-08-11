import { Suspense } from "react";
import Stack from "@mui/material/Stack";
import { fetchRandom, fetchRandomArray } from "./ServerComponents";
import { ShortlyComponent, SlowComponent } from "@/app/work/ClientComponents";

export default async function Pages() {
  const random = await fetchRandom();
  const randomArray = await fetchRandomArray();

  return (
    <div className="m-4">
      <ShortlyComponent />
      <Suspense fallback={<div>Rendering Component...</div>}>
        <SlowComponent initialNum={random} />
      </Suspense>
      <Stack direction="row">
        {randomArray.map((v, i) => {
          return (
            <Suspense key={i} fallback={<div>Rendering Component...</div>}>
              <SlowComponent key={i} initialNum={v} />
            </Suspense>
          );
        })}
      </Stack>
    </div>
  );
}
