"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect , useState } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";

export default function Home() {

  const [Loading, setLoading] = useState(false)
  const [ApiError, setApiError] = useState("")
  const [userName, setUserName] = useState("")
  const Router = useRouter()


  useEffect(() => {

    
  const getDetail = async()=>{

    setLoading(true)
    const data = await fetch("/api/my_detail")
    const res = await data.json()
    setUserName(res.userName)
    setLoading(false)


    if(res.status){
      Router.push("/home")
    }
    else{
      setApiError(res.message)
    }



  }
  getDetail()


    
  }, [])
  



  return (
    <div className="main bg-[#ECEFF1] h-screen w-screen flex  flex-col gap-5 justify-center items-center">
      
      
      {Loading ? <>

      <h1 className="text-black italic text-md">Loading...</h1>
      
      </> : 
      <>
      <div className="img w-full justify-center items-center h-[10vh] flex flex-col gap-2">
          <img src="https://cdn-icons-png.flaticon.com/512/891/891399.png" className="w-8 h-8" alt="" />
          <h1 className="text-black font-bold text-xl mt-1">Welcome to WebAuth</h1>

          {ApiError && <h1 className="text-red-500 mt-5 mb-10 text-sm italic">Note : {ApiError}</h1>}

        </div>

        <div className="buttons flex flex-row gap-5 h-[5vh]">
          <Link href="/login"></Link><button className="px-5 py-2 bg-slate-400 rounded-md font-semibold cursor-pointer text-black">Login</button>
          <Link href={"/signup"}></Link><button className="px-5 py-2 bg-slate-400 rounded-md font-semibold cursor-pointer text-black">Signup</button>


        </div>

      
      
      
      </>}




    </div>
  );
}
