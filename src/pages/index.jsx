import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";


export default function Home() {

    const [text, setText] = useState('');

  return (
        <>
        <Button variant="primary" onClick={() => console.log("Primary Clicked")}>
        Primary Button
      </Button>

      <Button variant="Teritary" onClick={() => console.log("Primary Clicked")}>
        Teritery
      </Button>

      <Button variant="ghost" onClick={() => console.log("Primary Clicked")}>
        Ghost
      </Button>


        <Input label="Enabled" placeholder="Enter text" />
        <Input label="Number Input" placeholder="Enter a number" type="number" />
        <Input label="Error Validation" placeholder="Min 3 characters" type="text" />
        <Input label="Disabled Input" disabled />


      </>
      
  );
}
