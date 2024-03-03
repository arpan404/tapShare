import { useStore } from "../../store";
import { MdOutlineCancel } from "react-icons/md";
import FileTypeIcon from "../icons/FileTypeIcon";

export default function ViewSelectedFiles() {
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  const setFiles = useStore((state) => state.setFiles);
  const progress = useStore((state) => state.progress);
  const progressBarWidth = loading && progress ? `${progress}%` : "0%";

  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <div className="relative overflow-hidden">
        {loading && progress !== 0 && (
          <div
            className="absolute top-0 left-0 w-0 h-[82%] z-10 bg-[#51f63b80] transition-[width 0.3s]"
            style={{ width: progressBarWidth }}
          />
        )}
        <div
          className={`custom-scroolbar flex gap-x-[.75em] snap-x snap-mandatory overflow-x-scroll max-w-[23em] sm:max-w-[35em] items-center`}
        >
          {files?.length > 0 &&
            files.map((file, index) => {
              return (
                <div
                  key={index}
                  className={`text-[#efefef] mb-2 snap-start flex flex-col justify-between min-w-[6.5em] items-center gap-x-1 border rounded-sm p-1 backdrop-blur-md`}
                >
                  <FileTypeIcon file={file} />
                  <div className="flex gap-x-1">
                    <p className="">{`${file.name
                      .toString()
                      .substring(0, 5)}...`}</p>
                    {!loading && (
                      <MdOutlineCancel
                        title={`remove ${file.name
                          .toString()
                          .substring(0, 5)}...`}
                        className="text-[1.4rem] text-red-400 hover:text-red-500 active:text-red-400 cursor-pointer transition ease-in duration-150"
                        onClick={() => handleRemoveFile(file.name)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
