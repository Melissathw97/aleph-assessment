'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/_components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import UserTable from "@/app/_components/dashboard/user-table";
import UserDetails from "@/app/_components/dashboard/user-details";

type IProps = {
  params: {
    lng: string
  }
};

type IUser = {
  name: string;
  email: string;
  age: number;
  phoneNumber: string;
  language: 'en' | 'ms';
};

const Home: React.FC<IProps> = ({ params: { lng } }) => {

  const { t } = useTranslation(lng, "dashboard");

  const [showTable, setShowTable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchData = async () => {
    const response = await fetch('/api/users')
    const data = await response.json();
    setUsers([ ...data ]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (isLoading) return (
    <div className="py-36 flex justify-center">
      <div className="animate-spin rounded-full border-t-2 border-emerald-700 h-8 w-8" />
    </div>
  );

  return (
    <main className="min-h-screen">
      <section className="py-28 md:py-36 px-6 flex flex-col">
        <UserDetails lng={lng} user={users.slice(-1)[0]} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
        >
          <p className='mt-5 text-lg font-bold text-center'>
            {t("number-of-users")}: {users.length}
          </p>
        </motion.div>

        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
          >
            {showTable ? (
              <UserTable lng={lng} users={users} />
            ) : (
              <div className="flex justify-center">
                <Button label={t("view-all-records")} onClick={() => setShowTable(!showTable)} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Home;