"use client"
import { useDispatch, useSelector } from "@/store";
import { postActions } from "@/store/post";
import Image from "next/image";
import { useEffect } from "react";


export default function Home() {
  const { post } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postActions.getPost())
  }, [])

  return (

    <div className="bg-homepage">
      <h1></h1>
    </div>
  );
}
