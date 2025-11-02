"use client"
import Link from "next/link";
import { useEffect , useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {


  const Router = useRouter()
  useEffect(() => {
    Router.replace("/home")
  
    
  }, [])
  

  return (
    <>
    </>
  );
}
