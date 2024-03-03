import { DragEventHandler } from "react";
import { useStore } from "../store";
import DeleteUserID from "../components/buttons/DeleteUserId";
import Toaster from "../components/animated/Toaster";
import AppBar from "../components/misc/AppBar";
import ShareTextButtonHome from "../components/buttons/ShareTextButtonHome";

export default function Home() {
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);
  const setToasterData = useStore((state) => state.setToasterData);
  const toasterData = useStore((state) => state.toasterData);
  const closeToaster = () => {
    setToasterData({
      open: false,
      message: "",
      severity: undefined,
    });
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const fileArray = Array.from(event.dataTransfer?.files || []);
    if (fileArray.length > 0) {
      setFiles(fileArray);
    }
  };
 
  return (
    <>
      <div
        className="relative overflow-hidden"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        style={{ maxHeight: "100vh" }}
      >
        <DeleteUserID />
        <Toaster data={toasterData} handleClose={closeToaster} />
        <AppBar />
        {files.length ===0 && <ShareTextButtonHome/>}
      </div>
    </>
  );
}
