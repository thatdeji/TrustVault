"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import { Upload } from "@/svg/upload";
import { Close } from "@/svg/close";

const allowedFileTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
];

const ImageUpload: React.FC<{
  url: string;
  setUrl: (url: string) => void;
}> = ({ url, setUrl }) => {
  // const projectId = "3597a188fdf24058adfd270a2162a220";

  // const projectSecret =
  //   "c0PLzbxTDUHc8QkYZjIM7U6MxuhsQdEU2HmUh6S5NbAVGbRqNrkerg";

  // const auth =
  //   "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  // const client = create({
  //   host: "ipfs.infura.io",
  //   port: 5001,
  //   protocol: "https",
  //   headers: {
  //     authorization: auth,
  //   },
  // });

  const handleImageUpload = async (files: FileList | null) => {
    if (files?.length && files[0]) {
      const file = files[0];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error("Invalid file type");
        return;
      }
      if (Array.from(files).length > 3) {
        toast.error("You can only upload 3 files");
        return;
      }
      if (file.size > 100000) {
        toast.error("File size too large");
        return;
      }
      try {
        toast.loading("Uploading image...");
        // const added = await client.add(file, {
        //   progress: (prog) => console.log(`received: ${prog}`),
        // });
        toast.loading("Uploaded image...");
        // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        // setUrl(url);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    handleImageUpload(target.files);
  };

  return (
    <div className="flex flex-col flex-1 gap-4">
      <p className="label">Image Evidence</p>
      {!url ? (
        <div>
          <label
            htmlFor="imageEvidence"
            className="relative border-dashed border border-[#B3B3B3] h-[121px] w-full flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-12 h-12">
              <Upload />
            </div>
            <p className="text-sm font-light">Max allowed image size (100KB)</p>
            <input
              className="appearance-none absolute top-0 left-0 cursor-pointer w-0 h-0"
              type="file"
              id="imageEvidence"
              name="imageEvidence"
              accept="image/*"
              multiple
              onChange={handleInput}
            />
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-4 ">
          <div className="relative w-full h-20">
            <Image alt="" src={url} fill />
          </div>
          <button
            onClick={() => setUrl("")}
            className="text-red-500 absolute -top-2 -right-2 w-2 h-2 shrink-0"
          >
            <Close />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
