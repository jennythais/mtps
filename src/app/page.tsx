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
  console.log(post);
  return (

    <h1></h1>
  );
}
