"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import OTPTimer, { OTPTimerHandle } from "@/app/components/Timer"

interface Inputs {
  otp: Number
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [loading, setLoading] = useState(false)
  const Router = useRouter()
  const [apiError, setApiError] = useState("")
  const timerRef = useRef<OTPTimerHandle>(null);



  const ResendCode = () => {


    //Logic to send OTP again


  }


  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    setLoading(true)

    const response = await fetch("/api/forOTP", {
      method: "POST",
      body: JSON.stringify({

        otp: data.otp

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const res = await response.json()

    if (res.status) {
      Router.push("/home")
    }
    else {
      setApiError(res.message)
    }

    setLoading(false)


  }


  return (
    <div className="flex flex-col h-screen  w-screen justify-center items-center bg-[#ECEFF1] bg-cover ">




      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  px-15 py-10 rounded-lg  bg-white text-white">

        <div className="img w-full justify-center items-center h-[5vh] flex">
          <img src="https://cdn-icons-png.flaticon.com/512/891/891399.png" className="w-8 h-8" alt="" />
          <h1 className="text-slate-400 font-bold text-xl mt-1">WebAuth</h1>

        </div>

        <h1 className="text-sm text-slate-500 italic mt-5 mb-2">6 digit OTP has been send to your Inbox</h1>



        <input
          {...register("otp")}
          className="px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded"
          placeholder="Verification Code"
          required
          autoFocus

        />

        {apiError && <h1 className="text-sm mt-1 mb-1 italic text-red-500">{apiError}</h1>}

        {loading ? <input type="submit" value={"Loading..."} className="bg-green-500 text-white px-2 py-1 mt-7 rounded cursor-pointer" />
          : <input type="submit" value={"Submit"} className="bg-green-500 text-white px-2 py-1 mt-7 rounded cursor-pointer" />
        }

        <Link className=" w-full text-center text-slate-400 text-xs mt-5" href={"#"} onClick={(e) => {
          e.preventDefault();
          ResendCode();
          timerRef.current?.start(); 
        }}>Resend Code</Link>

        <Link className=" w-full text-center flex flex-row justify-center items-center gap-2 text-slate-400 text-xs mt-5" href={"/"}>Code will be expire in <OTPTimer ref={timerRef} duration={120} /> </Link>

      </form>
    </div>
  )
}

export default Page
