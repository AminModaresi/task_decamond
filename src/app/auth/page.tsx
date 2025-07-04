"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./auth.module.scss";
import { useUser } from "@/context/UserContext";

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)")
});

type FormData = {
  phone: string;
};

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const apiData = await res.json();
      const user = { ...apiData.results[0], phone: data.phone };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      setError("phone", { type: "manual", message: "خطا در دریافت اطلاعات کاربر" });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>ورود</h2>
        <Input
          type="tel"
          placeholder="شماره موبایل (مثال: 09123456789)"
          maxLength={11}
          dir="ltr"
          {...register("phone")}
        />
        {errors.phone && <div className={styles.error}>{errors.phone.message}</div>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
