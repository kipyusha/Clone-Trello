import { ModalStart } from "@/components/ModalStart";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { pageSlice, selectPage, useAppDispatch } from "../store/store";
import Trello from "@/components/Trello";

export default function Home() {
  const dispatch = useAppDispatch();
  const { name } = useSelector(selectPage);
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  useEffect(() => {
    const userName = Cookies.get("userName");
    if (!userName) {
      setModal(true);
    }
  }, []);

  return (
    <>
      <ModalStart visible={isModal} onClose={onClose} />
      <Trello />
    </>
  );
}
