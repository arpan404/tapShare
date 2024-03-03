import { useState, useEffect } from "react";
import { PiFile } from "react-icons/pi";
import TapShareLogoGif from "../../assets/tapshare.gif";
import { IconType } from "react-icons";

const iconMap: { [key: string]: string } = {
  mp3: "PiFileAudio",
  archive: "PiFileArchive",
  code: "PiFileCode",
  css: "PiFileCss",
  csv: "PiFileCsv",
  doc: "PiFileDoc",
  docx: "PiFileDoc",
  html: "PiFileHtml",
  image: "PiFileImage",
  webp: "PiFileImage",
  jpg: "PiFileJpg",
  js: "PiFileJs",
  jsx: "PiFileJsx",
  pdf: "PiFilePdf",
  png: "PiFilePng",
  ppt: "PiFilePpt",
  pptx: "PiFilePpt",
  sql: "PiFileSql",
  svg: "PiFileSvg",
  text: "PiFileText",
  txt: "PiFileText",
  ts: "PiFileTs",
  tsx: "PiFileTsx",
  video: "PiFileVideo",
  mp4: "PiFileVideo",
  vue: "PiFileVue",
  xls: "PiFileXls",
  xlsx: "PiFileXls",
  zip: "PiFileZip",
  files: "PiFiles",
  gif: "PiGif",
};

function Icon({ name }: { name: string }) {
  const iconClassName = "text-[2.5rem]";
  const [IconComponent, setIconComponent] = useState<IconType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const iconName = name.split(".").pop()!.toLowerCase();

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { default: Icon } = await import(
          `react-icons/${iconMap[iconName.toLowerCase()]}`
        );
        setIconComponent(() => Icon);
      } catch (error) {
        console.error(`Error loading icon ${iconName}:`, error);
        setIconComponent(() => PiFile); // Fallback to default icon
      } finally {
        setIsLoading(false);
      }
    };

    if (!IconComponent) {
      loadIcon();
    }

    return () => {
      setIconComponent(null);
    };
  }, [IconComponent, iconName]);
  if (!isLoading && IconComponent)
    return <IconComponent className={iconClassName} />;
  return <PiFile />;
}

export default function FileTypeIcon({ file }: { file: File }) {
  if (file.type.startsWith("image")) {
    return (
      <img
        className="w-full object-cover"
        src={file ? URL.createObjectURL(file) : TapShareLogoGif}
      />
    );
  } else {
    return <Icon name={file.name || "file.files"} />;
  }
}
