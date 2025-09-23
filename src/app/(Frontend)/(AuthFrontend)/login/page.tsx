"use client"
import { useState } from "react"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

interface Inputs {
  username: string
  password: string
  email: string,
  conPass: string
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [ApiError, setApiError] = useState("")
  const Router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    setLoading(true)

    const response = await fetch("/api/forLogin", {
      method: "POST",
      body: JSON.stringify({
        userEmail: data.email,
        userPassword: data.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const res = await response.json()

    setLoading(false)

    if (res.status) {
      Router.push("/")
    }
    else{
      setApiError(res.message)
    }
  }

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className="flex flex-col h-screen  w-screen justify-center items-center bg-[#ECEFF1] bg-cover ">




      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  px-15 py-10 rounded-lg  bg-white text-white">

        <div className="img w-full justify-center items-center h-[5vh] flex">
          <img src="https://cdn-icons-png.flaticon.com/512/891/891399.png" className="w-8 h-8" alt="" />
          <h1 className="text-slate-400 font-bold text-xl mt-1">WebAuth</h1>

        </div>



        <input
          {...register("email")}
          className="px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded"
          placeholder="Email"
          required
        />

        {errors.email?.type == "required" && <h1 className="itelic text-sm text-red-500">Email is required.</h1>}

        <input
          {...register("password", { required: true })}
          className="px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded"
          placeholder="Password"
          type={show ? "text" : "password"}
          required
        />

        {ApiError && <h1 className="text-red-500 italic text-sm">{ApiError}</h1>}


        <div className="check flex flex-row w-full justify-start gap-2 mt-2">
          <input type="checkbox" onClick={handleShow} id="check" name="" />
          <h1 className="text-sm text-slate-400 ">Show Password</h1>
        </div>

        {loading ? <input type="submit" value={"Loading..."} className="bg-green-500 text-white px-2 py-1 mt-7 rounded cursor-pointer" />
          : <input type="submit" value={"Login"}  className="bg-green-500 text-white px-2 py-1 mt-7 rounded cursor-pointer" />
        }

        <Link className=" w-full text-center text-slate-400 text-xs mt-5" href={"/forgetPassword"}>Forget Password ?</Link>

        <Link className=" w-full text-center text-slate-400 text-xs mt-5" href={"/signup"}>or, Signup to continue</Link>
        {/* <div className="buttons flex flex-row justify-center gap-5 items-center w-full">
          <button onClick={() => signIn("google", { callbackUrl: "/home" })} className="px-4 py-2 text-sm bg-slate-200 mt-5 cursor-pointer rounded-md text-white"><img className="h-5" src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-internet-icon-vector-png-image_9183287.png" ></img></button>

          <button className="px-4 py-2 text-sm bg-slate-200 mt-5 cursor-pointer rounded-md text-white"><img className="h-5" src="https://raw.githubusercontent.com/github/explore/9adcff6afda303fb7fcead92954bad819fa7a4bd/topics/facebook/facebook.png" ></img></button>


        </div> */}
      </form>
    </div>
  )
}

export default Page
