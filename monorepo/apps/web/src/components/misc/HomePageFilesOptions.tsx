import ViewSelectedFiles from "./ViewSelectedFiles"
import UploadFiles from "../buttons/UploadFiles"
import ReceiverEmailInputField from "../input/ReceiverEmailInputField"
export default function HomePageFilesOptions() {
  return (
    <div className="absolute to flex flex-col w-full">
      {/* shows the selected files, also allow to remove files (if wanted) */}
      <div className="flex justify-center">
        <ViewSelectedFiles />
      </div>

      {/* the input field that accepts email */}
      <ReceiverEmailInputField />

      {/* generates links or send email*/}
      <div className="flex justify-center">
        <UploadFiles />
      </div>
    </div>
  );
}
