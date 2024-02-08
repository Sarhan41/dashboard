import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/Header/MainNav/MainNav";
import StoreSwitcher from "@/components/Store-Switcher/StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Nabar = async () => {
  const { userId } = auth();

  if(!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="border-b">
      {/* 
      //! overflow-x-scoll is a temporary fix of responsive issue, you have to make different popup menu for mobile
      */}
      <div className="flex h-16 items-center px-4 max-sm:overflow-x-scroll">
        <StoreSwitcher items={stores}/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center ">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Nabar;
