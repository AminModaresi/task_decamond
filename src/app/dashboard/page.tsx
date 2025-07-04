"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";
import { useUser } from "@/context/UserContext";

const DashboardPage = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>داشبورد</h1>
        <p className={styles.desc}>خوش آمدید {user.name?.first ? user.name.first : user.phone}</p>
        {user.picture?.large && (
          <img src={user.picture.large} alt="User" style={{borderRadius: '50%', width: 80, height: 80, marginTop: 16}} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
