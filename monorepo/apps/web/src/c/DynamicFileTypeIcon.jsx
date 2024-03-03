// DynamicIcon.js
import React, { useState, useEffect } from "react";
import { PiFile } from "react-icons/pi";

const iconMap = {
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

const DynamicIcon = ({ name }) => {
  const [IconComponent, setIconComponent] = useState(null);
  const iconName = name.split(".").pop().toLowerCase();
  useEffect(() => {
    const importIcon = async () => {
      try {
        const { [iconMap[iconName.toLowerCase()]]: Icon } = await import(
          "react-icons/pi"
        );

        setIconComponent(() => Icon);
      } catch (error) {
        console.error(`Error loading icon ${iconName}:`, error);
      }
    };

    importIcon();
  }, [iconName]);

  return IconComponent ? <IconComponent /> : <PiFile />;
};

export default DynamicIcon;
